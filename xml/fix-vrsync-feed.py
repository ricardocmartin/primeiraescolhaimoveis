#!/usr/bin/env python3
"""Ajusta feeds VRSync para testes na Zap: maioria válida, erros intencionais preservados."""

import re
import shutil
from pathlib import Path

BASE_URL = "https://ricardocmartin.github.io/primeiraescolhaimoveis"

# CEP com hífen (erro intencional na Zap)
CEP_BROKEN_IDS = {
    "PEI-AP0002",
    "PEI-AP0050",
    "PEI-AP0041",
    "PEI-CA0006",
    "PEI-CA0017",
    "PEI-CA0033",
    "PEI-CA0038",
}

# URLs de imagem relativas (erro intencional)
IMAGE_BROKEN_IDS = {
    "PEI-AP0006",
    "PEI-AP0007",
    "PEI-AP0021",
    "PEI-AP0022",
    "PEI-AP0023",
    "PEI-AP0024",
}

# Aluguel com ListPrice em vez de RentalPrice (erro intencional)
RENTAL_BROKEN_IDS = {
    "PEI-AP0021",
    "PEI-AP0022",
    "PEI-AP0023",
    "PEI-AP0024",
}

# dados-reduzido: subset alinhado aos mesmos cenários
REDUCED_CEP_BROKEN = {"PEI-AP0002"}
REDUCED_IMAGE_BROKEN = {"PEI-AP0021", "PEI-AP0022", "PEI-AP0020", "PEI-AP0023"}
REDUCED_RENTAL_BROKEN = {"PEI-AP0020", "PEI-AP0023"}

MIN_MEDIA_ITEMS = 5


def normalize_postal_code(block: str, listing_id: str, broken_ids: set[str]) -> str:
    if listing_id in broken_ids:
        return block
    return re.sub(
        r"<PostalCode>(\d{5})-(\d{3})</PostalCode>",
        r"<PostalCode>\1\2</PostalCode>",
        block,
    )


def fix_images(block: str, listing_id: str, broken_ids: set[str]) -> str:
    if listing_id in broken_ids:
        return block

    def repl(match: re.Match[str]) -> str:
        path = match.group(1)
        if path.startswith("http://") or path.startswith("https://"):
            return match.group(0)
        return f'<Item medium="image">{BASE_URL}{path}</Item>'

    return re.sub(
        r'<Item medium="image">(/[^<]+)</Item>',
        repl,
        block,
    )


def pad_media_images(
    block: str,
    listing_id: str,
    broken_ids: set[str],
    min_count: int = MIN_MEDIA_ITEMS,
) -> str:
    if listing_id in broken_ids:
        return block
    media_match = re.search(r"(<Media>)(.*?)(</Media>)", block, re.DOTALL)
    if not media_match:
        return block
    inner = media_match.group(2)
    items = re.findall(r'\n\s*<Item medium="image">[^<]+</Item>', inner)
    if not items or len(items) >= min_count:
        return block
    padded = list(items)
    idx = 0
    while len(padded) < min_count:
        padded.append(items[idx % len(items)])
        idx += 1
    new_inner = "".join(padded) + "\n      "
    return (
        block[: media_match.start()]
        + media_match.group(1)
        + new_inner
        + media_match.group(3)
        + block[media_match.end() :]
    )


def fix_rental_price(block: str, listing_id: str, broken_ids: set[str]) -> str:
    if "For Rent" not in block or listing_id in broken_ids:
        return block
    return re.sub(
        r"<ListPrice currency=\"BRL\">(\d+)</ListPrice>",
        r'<RentalPrice currency="BRL" period="Monthly">\1</RentalPrice>',
        block,
        count=1,
    )


def process_file(
    path: Path,
    cep_broken: set[str],
    image_broken: set[str],
    rental_broken: set[str],
) -> None:
    text = path.read_text(encoding="utf-8")
    parts = re.split(r"(<Listing>.*?</Listing>)", text, flags=re.DOTALL)
    out: list[str] = []
    for part in parts:
        if not part.startswith("<Listing>"):
            out.append(part)
            continue
        m = re.search(r"<ListingID>([^<]+)</ListingID>", part)
        if not m:
            out.append(part)
            continue
        lid = m.group(1)
        block = part
        block = normalize_postal_code(block, lid, cep_broken)
        block = fix_images(block, lid, image_broken)
        block = pad_media_images(block, lid, image_broken)
        block = fix_rental_price(block, lid, rental_broken)
        out.append(block)
    path.write_text("".join(out), encoding="utf-8")


def main() -> None:
    root = Path(__file__).resolve().parent
    pairs = [
        ("dados.xml", CEP_BROKEN_IDS, IMAGE_BROKEN_IDS, RENTAL_BROKEN_IDS),
        (
            "dados-reduzido.xml",
            REDUCED_CEP_BROKEN,
            REDUCED_IMAGE_BROKEN,
            REDUCED_RENTAL_BROKEN,
        ),
    ]
    public = root.parent / "public" / "xml"

    for filename, cep_b, img_b, rent_b in pairs:
        src = root / filename
        backup = root / filename.replace(".xml", ".erros-integracao.xml")
        shutil.copy2(src, backup)
        process_file(src, cep_b, img_b, rent_b)
        if (public / filename).exists():
            shutil.copy2(src, public / filename)
        pub_backup = public / filename.replace(".xml", ".erros-integracao.xml")
        shutil.copy2(backup, pub_backup)

    print("Backups: *.erros-integracao.xml")
    print("Feeds atualizados em xml/ e public/xml/")


if __name__ == "__main__":
    main()
