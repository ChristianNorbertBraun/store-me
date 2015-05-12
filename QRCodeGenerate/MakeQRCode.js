

function makeCode()
{
    var code = new QRCode("qrcode",{
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
    var text = "Hello World";

    code.makeCode(text);
}

