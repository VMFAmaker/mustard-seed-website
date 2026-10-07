"""Convert the Mustard Seed Word policies into JSON for the website.

Run from the project folder:  python scripts/convert-docs.py
Re-run whenever a source document changes or a detail below is filled in.
"""
import html
import json
import os
import re

import docx
from docx.oxml.ns import qn
from docx.table import Table
from docx.text.paragraph import Paragraph

SRC = r"C:\Users\virgi\OneDrive\Documents\Mustard Seed Official"
OUT = os.path.join(os.path.dirname(__file__), "..", "content", "documents")

# Details that fill the [placeholders] in the documents (None = leave the placeholder showing)
DETAILS = {
    "email": "virgilioalmeida2005@gmail.com",
    "company_number": None,
    "address": None,
    "website": None,
    "founder": None,
    "date": None,
}

DOCS = [
    ("privacy-policy", "08 - Web Legal/Website Privacy Policy.docx"),
    ("cookie-policy", "08 - Web Legal/Cookie Policy.docx"),
    ("terms-of-use", "08 - Web Legal/Website Terms of Use.docx"),
    ("terms-of-business", "03 - Core Agreements/General Terms of Business.docx"),
    ("payment-terms", "05 - Service Agreements/Standard Payment Terms.docx"),
    ("anti-bribery-policy", "06 - Policies/Anti-Bribery Policy.docx"),
    ("complaints-policy", "06 - Policies/Complaints Handling Policy.docx"),
    ("conflicts-of-interest-policy", "06 - Policies/Conflicts of Interest Policy.docx"),
    ("data-protection-policy", "06 - Policies/Data Protection Policy.docx"),
    ("equal-opportunities-policy", "06 - Policies/Equal Opportunities Policy.docx"),
    ("health-and-safety-policy", "06 - Policies/Health and Safety Policy.docx"),
    ("information-security-policy", "06 - Policies/Information Security Policy.docx"),
]


def fmt(text):
    t = html.escape(text, quote=False)
    if DETAILS["company_number"]:
        t = re.sub(r"(company number:?\s*)\[(TBC|number|To be inserted[^\]]*)\]", r"\g<1>" + DETAILS["company_number"], t, flags=re.I)
    email = f'<a href="mailto:{DETAILS["email"]}">{DETAILS["email"]}</a>'
    subs = {
        "email address": email, "complaints email address": email,
        "website URL": DETAILS["website"], "Founder Name": DETAILS["founder"], "Date": DETAILS["date"],
        "Registered Address": DETAILS["address"], "Address": DETAILS["address"],
    }

    def rep(m):
        return subs.get(m.group(1)) or f'<span class="ph">[{m.group(1)}]</span>'

    return re.sub(r"\[([^\[\]]{1,90})\]", rep, t)


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def blocks(d):
    for child in d.element.body.iterchildren():
        if child.tag == qn("w:p"):
            yield Paragraph(child, d)
        elif child.tag == qn("w:tbl"):
            yield Table(child, d)


def convert(path):
    d = docx.Document(path)
    title, meta, control, out, toc = None, [], [], [], []
    state = {"list": None}
    started = pending_control = False

    def close():
        if state["list"]:
            out.append("</ul>")
            state["list"] = None

    def open_(kind):
        if state["list"] != kind:
            close()
            out.append(f'<ul class="{kind}">')
            state["list"] = kind

    for b in blocks(d):
        if isinstance(b, Table):
            close()
            rows = [[c.text.strip() for c in r.cells] for r in b.rows]
            if pending_control:
                control += [[r[0], fmt(r[1])] for r in rows if len(r) >= 2]
                pending_control = False
                continue
            h = '<div class="table-scroll"><table><thead><tr>' + "".join(f"<th>{fmt(c)}</th>" for c in rows[0]) + "</tr></thead><tbody>"
            h += "".join("<tr>" + "".join(f"<td>{fmt(c)}</td>" for c in r) + "</tr>" for r in rows[1:])
            out.append(h + "</tbody></table></div>")
            continue
        t = b.text.strip()
        if not t:
            continue
        style = b.style.name
        if not started:
            if title is None and t.upper() == "MUSTARD SEED LTD":
                continue
            if title is None:
                title = t
                continue
            if style.startswith("Heading"):
                started = True
            else:
                meta += [fmt(m.strip()) for m in t.split("|")]
                continue
        if style.startswith("Heading"):
            close()
            if t.lower() == "document control":
                pending_control = True
                continue
            if t.isupper():
                t = t.title()
            sid = slug(t)
            toc.append([sid, re.sub(r"^\d+[A-Z]?\.\s*", "", t)])
            out.append(f'<h2 id="{sid}">{fmt(t)}</h2>')
            continue
        if re.match(r"^(Signed|Name|Position):", t) or re.match(r"^Date:\s*_+", t) or t.upper() == "MUSTARD SEED LTD":
            continue
        if t.isupper() and len(t) < 40:
            close()
            sid = slug(t)
            toc.append([sid, t.title()])
            out.append(f'<h2 id="{sid}">{html.escape(t.title())}</h2>')
            continue
        if t.startswith("Effective from:") and out:
            continue
        numpr = b._p.pPr is not None and b._p.pPr.numPr is not None
        if style == "List Paragraph" or numpr:
            open_("bullets")
            out.append(f"<li>{fmt(t)}</li>")
            continue
        m = re.match(r"^\(([a-z]{1,3})\)\s+(.*)$", t)
        if m:
            open_("items")
            out.append(f'<li><span class="n">({m.group(1)})</span><span>{fmt(m.group(2))}</span></li>')
            continue
        close()
        m = re.match(r"^(\d+[A-Z]?\.\d+)\s+(.*)$", t)
        if m:
            out.append(f'<p class="clause"><span class="n">{m.group(1)}</span><span>{fmt(m.group(2))}</span></p>')
            continue
        m = re.match(r'^["\u201c]([^"\u201d]+)["\u201d](.*)$', t)
        if m:
            out.append(f'<p class="def"><strong>&ldquo;{html.escape(m.group(1))}&rdquo;</strong>{fmt(m.group(2))}</p>')
            continue
        out.append(f"<p>{fmt(t)}</p>")
    close()
    return {"meta": meta, "control": control, "html": "\n".join(out), "toc": toc}


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for sl, path in DOCS:
        data = convert(os.path.join(SRC, path))
        with open(os.path.join(OUT, f"{sl}.json"), "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=1)
    print(f"converted {len(DOCS)} documents")
