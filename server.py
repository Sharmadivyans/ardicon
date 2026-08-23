#!/usr/bin/env python3
"""
ARDICON REALTORS PVT. LTD. - Web Platform Server
Zero-dependency HTTP server with REST endpoints and static file serving.
"""

import http.server
import socketserver
import json
import os
import urllib.parse

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class ArdiconHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/api/status":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            status_data = {
                "status": "online",
                "company": "ARDICON REALTORS PVT. LTD.",
                "director": "Rohit Jain",
                "phone": "+91 9810273855",
                "email": "ardiconrealtors@gmail.com",
                "office": "Office No 309-310, 3rd Floor, MSX Tower II, Alpha 1, Commercial Belt, Greater Noida"
            }
            self.wfile.write(json.dumps(status_data).encode("utf-8"))
            return
        
        # Fallback to standard static file serving
        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/api/leads":
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            try:
                lead_data = json.loads(body.decode("utf-8"))
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                response = {
                    "success": True,
                    "message": "Lead received and assigned to Rohit Jain",
                    "leadId": "lead-" + str(os.urandom(4).hex())
                }
                self.wfile.write(json.dumps(response).encode("utf-8"))
            except Exception as e:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
            return

        return super().do_POST()

def run_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), ArdiconHTTPHandler) as httpd:
        print(f"============================================================")
        print(f"  ARDICON REALTORS PVT. LTD. - Real Estate Platform Online")
        print(f"  Headquarters: Office 309-310, MSX Tower II, Alpha 1 Greater Noida")
        print(f"  Hotline: +91 9810273855 | Email: ardiconrealtors@gmail.com")
        print(f"  Serving at: http://localhost:{PORT}")
        print(f"============================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer shutting down gracefully.")

if __name__ == "__main__":
    run_server()
