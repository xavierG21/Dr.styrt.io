var path = 'https://www.drstyrt.com/';


var file_uploads = new plupload.Uploader({
  runtimes : 'html5,flash,silverlight,html4',
  browse_button : 'pick_files', 
  url : path+'themes/file_uploads.php',
  flash_swf_url : '../fileUpload_js/Moxie.swf',
  silverlight_xap_url : '../fileUpload_js/Moxie.xap',
filters: {
    max_file_size: 10000000
  },
  init: {
    PostInit: function() {
      
    },

    FilesAdded: function(up, files) {
        $('.loader').css('display','inline');
        file_uploads.start();
    },

    UploadProgress: function(up, file) {
        //document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
        $('.loader').css('display','inline');
    },

    FileUploaded: function(up, file, info) {
        var json_ = $.parseJSON(info.response);
        populate_file_fields(json_.realName, json_.fName);
    },
    
    UploadComplete: function(up, files) {
      $('.loader').hide();
    },

  }
});
file_uploads.bind('Error', function(Up, ErrorObj) {
 
     if (ErrorObj.code == plupload.FILE_SIZE_ERROR) {
        alert('Maximum file upload size limit is 10MB');
     }

});
file_uploads.init();

var x = 1;

function populate_file_fields(rName, fName) {
  console.log(x)
  $('#doc_files .file_names').append(rName+', ');
  $('#doc_'+x).val(path+'themes/file_uploads/'+fName);
  $('#doc_files .btn_del').show();
  $('#file_validate').val(rName);
  x++;
}



$(function() {
    $('.btn_del').click(function(e) {
        e.stopPropagation();
        $('#doc_files [type="hidden"]').removeAttr('value');
        $('.file_names').empty();
        $('.btn_del').hide();
        $('#file_validate').removeAttr('value');
    });
});
