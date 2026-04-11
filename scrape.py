import urllib.request
from html.parser import HTMLParser
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.images = []
    def handle_starttag(self, tag, attrs):
        if tag == "img":
            for attr in attrs:
                if attr[0] in ["src", "data-src"]:
                    self.images.append(attr[1])

req = urllib.request.Request("https://favercar.com/location-voiture-luxe/", headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    html = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
    parser = MyHTMLParser()
    parser.feed(html)
    for img in set(parser.images):
        if img.endswith(('.jpg', '.png', '.webp', '.jpeg')):
            print(img)
except Exception as e:
    print("Error:", e)
