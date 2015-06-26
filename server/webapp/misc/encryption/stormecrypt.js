/**
 * Created by Marvin Therolf on 26.06.15.
 */

var storemeEncrypt = function (message)
{
    var code = "";
    var alphabet = "StoreMe";

    for (var i = 0; i < message.length; i++)
    {
        var letter = message.charCodeAt(i)-48;
        console.log(letter);
        var offset = alphabet.charCodeAt(i%alphabet.length)-48;
        console.log(offset);
        letter += offset;
        console.log(letter);
        letter %= (122-65);   // char code of z
        console.log(letter);
        letter += 65;   // char code of A
        console.log(letter);
        code += String.fromCharCode(letter);
    }
    return code;
};

var storemeDecrypt = function (code)
{
    var message = "";
    var alphabet = "StoreMe";

    for (var i = 0; i < code.length; i++)
    {

    }
    return message;
};

console.log(storemeEncrypt("M"));
console.log(storemeDecrypt("HDPWvcveNJNBdDlU"));
