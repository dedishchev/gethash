$(document).ready(function() {
    $(document).on('change', '#selected_file', function() {
        file = document.getElementById("selected_file").files[0];
        $('#hash_file_button').removeAttr('disabled');
        $('#fileinfo').show();
        $('#filename').text('File name: ' + file.name);
        $('#filesize').text('File size: ' + bytesToSize(file.size));
    });

    function bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    };

    $('.result_div').hide();
    var obj = {algo: 'MD5'}

    $(document).on('click', '.dropdown-menu li a', function() {
        var selText = $(this).text();
        if (selText) {
            obj.algo = selText;
        }
        $(this).parents('.input-group-btn').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
    });

    $('#hash_button').click(function(){
        var string_input = $('#string_input').val();
        $.get('/api/'+obj.algo+'/'+string_input, function(data){
            $('.result_div').show();
            $('.result_div').text(data.hash);
        });
    });

    $('#hash_text_button').click(function(){
        var text_input = $('#text_input').val();
        var send_data = JSON.stringify({'text': text_input})
        $.post('/api/'+obj.algo+'/', send_data, function(data){
            console.log(data);
            $('.result_div').show();
            $('.result_div').text(data.hash);
        });
    });

    function get_file_checksum(algo) {
        file = document.getElementById("selected_file").files[0]
        var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        var chunkSize = 2097152;
        var chunks = Math.ceil(file.size / chunkSize);
        var currentChunk = 0;
        var fileReader = new FileReader();
        
        switch(algo) {
            case 'MD5':
                var gethash = CryptoJS.algo.MD5.create();
                break;
            case 'SHA1':
                var gethash = CryptoJS.algo.SHA1.create();
                break;
            case 'SHA224':
                var gethash = CryptoJS.algo.SHA224.create();
                break;
            case 'SHA256':
                var gethash = CryptoJS.algo.SHA256.create();
                break;
            case 'SHA384':
                var gethash = CryptoJS.algo.SHA384.create();
                break;
            case 'SHA512':
                var gethash = CryptoJS.algo.SHA512.create();
                break;
        };

        function get_progress(currentChunk){
            var progress = Math.ceil(currentChunk * 100 / chunks);
            $('.progress').show();
            $('#progressbar').width(progress + '%');
            $('#progress_text').text(progress + '%');
        };

        fileReader.onload = function(e) {
            get_progress(currentChunk);
            gethash.update(CryptoJS.enc.Latin1.parse(e.target.result));
            currentChunk++;

            if (currentChunk < chunks) {
                loadNext();
            } else {
                $('.result_div').show();
                $('.result_div').text(gethash.finalize().toString());
                $('.progress').hide();
            };
        };

        function loadNext() {
            var start = currentChunk * chunkSize,
                end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

            fileReader.readAsBinaryString(blobSlice.call(file, start, end));
        };

        loadNext();

    };

    $('#hash_file_button').click(function(){
        get_file_checksum(obj.algo);
    });

});

