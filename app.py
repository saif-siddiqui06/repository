from flask import Flask, render_template, request, send_file
import qrcode
from io import BytesIO
import io

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')





@app.route('/generate_qr', methods=['GET'])
def generate_qr():
    # Get the 'data' parameter from the request
    data = request.args.get('data', '')
    
    if not data:
        return "Error: No data provided for QR code generation", 400

    # Generate the QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)

    # Create an image file in memory
    img = qr.make_image(fill_color="black", back_color="white")
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    buf.seek(0)

    # Send the image file as a response
    return send_file(buf, mimetype='image/png', as_attachment=False, download_name='qr-code.png')



if __name__ == '__main__':
    app.run(debug=True)
