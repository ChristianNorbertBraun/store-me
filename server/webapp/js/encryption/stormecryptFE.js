/**
 * Created by Marvin Therolf on 26.06.15.
 */
var codeAlphabet = "StoreMe";
var alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz:!_-+üäöß$§%*~#,.;^°(){}[]<>|'";

var storeMeEncrypt = function(message)
{
    var code = "";

    for (var i = 0; i < message.length; i++)
    {
        var letter = alphabet.indexOf(message.charAt(i));
        var offset = alphabet.indexOf(codeAlphabet.charAt(i%codeAlphabet.length));
        letter += offset;
        letter = modulo(letter, alphabet.length);
        code += alphabet.charAt(letter);
    }
    return code;
};

var storeMeDecrypt = function(code)
{
    var message = "";

    for (var i = 0; i < code.length; i++)
    {
        var letter = alphabet.indexOf(code.charAt(i));
        var offset = alphabet.indexOf(codeAlphabet.charAt(i%codeAlphabet.length));
        letter -= offset;
        letter = modulo(letter, alphabet.length);
        message += alphabet.charAt(letter);
    }
    return message;
};

var modulo = function(x, y)
{
    return ((x%y)+y)%y;
};

console.log(storeMeEncrypt("HalloWelt"));