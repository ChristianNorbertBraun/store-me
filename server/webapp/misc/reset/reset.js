/**
 * Created by captainluma on 13.07.15.
 */

$.couch.urlPrefix = "http://notimeforthat.org:5984";

var tableNames = ["storemeattributes", "storemecategory", "storemecontainer", "storemeitems", "storemelog", "storemeusers"];
var reset = [ false, false, false, false, false, false ];

var resetTables = function()
{
    reset[0] = $('#cbAttributes').get()[0].checked;
    reset[1] = $('#cbCategories').get()[0].checked;
    reset[2] = $('#cbContainers').get()[0].checked;
    reset[3] = $('#cbItems').get()[0].checked;
    reset[4] = $('#cbLog').get()[0].checked;
    reset[5] = $('#cbUsers').get()[0].checked;

    for ( var i = 0; i < tableNames.length; i++ )
    {
        if ( reset[i] )
        {
            dropDatabase( tableNames[i] );
            createDatabase( tableNames[i] );
        }
    }
};

var dropDatabase = function( tableName )
{
    $.couch.db(tableName).drop(
    {
        success: function ( data )
        {
            console.log( data );
        },
        error: function ( status )
        {
            console.log( status );
        }
    });
};

var createDatabase = function( tableName )
{
    $.couch.db( tableName ).create(
    {
        success: function( data )
        {
            console.log( data );
        },
        error: function( status )
        {
            console.log( status );
        }
    });
};