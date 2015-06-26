/**
 * Created by Marvin Therolf on 26.06.15.
 */
var codeAlphabet = "StoreMe";
var alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

var storeMeEncrypt = function (message)
{
    var code = "";

    for (var i = 0; i < message.length; i++)
    {
        var letter = message.charCodeAt(i) - 48;

        var offset = codeAlphabet.charCodeAt(i%codeAlphabet.length);
        letter += offset;
        letter = modulo(letter, (123-48));
        letter += 48;
        code += String.fromCharCode(letter);
    }
    return code;
};

var storeMeDecrypt = function (code)
{
    var message = "";

    for (var i = 0; i < code.length; i++)
    {
        var letter = code.charCodeAt(i) - 48;
        var offset = codeAlphabet.charCodeAt(i%codeAlphabet.length);
        letter -= offset;
        letter = modulo(letter, (123-48));
        letter += 48;
        message += String.fromCharCode(letter);
    }
    return message;
};

var modulo = function(x, y)
{
    return ((x%y)+y)%y;
};

console.log(storeMeEncrypt("Marvin0123456789"));
console.log(storeMeDecrypt("U?KR8pJ9[W[O8Q@b"));
