$(() => { 
  var pathname = window.location.pathname;
  
  $('#froala-editor').froalaEditor({
      charCounterCount: true,
      // Set the image upload parameter.
      imageUploadParam: 'image_param',

      // Set the image upload URL.
      imageUploadURL: '/upload_image',

      // Additional upload params.
      imageUploadParams: {id: 'my_editor'},

      // Set request type.
      imageUploadMethod: 'POST',

      // Set max image size to 5MB.
      imageMaxSize: 5 * 1024 * 1024,

      // Allow to upload PNG and JPG.
      imageAllowedTypes: ['jpeg', 'jpg', 'png'],
      toolbarInline: true,
      charCounterCount: false,
      videoResponsive: true,
      toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '-', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'indent', 'outdent', '-', 'insertImage', 'insertLink', 'insertFile', 'insertVideo', 'undo', 'redo'],
      toolbarVisibleWithoutSelection: true,
      saveURL: 'http://0.0.0.0:8080/'+pathname,
      iframe: true,
      // Set maximum number of characters.
      charCounterMax: 1000,
    });
    $('#froala-editor').on('froalaEditor.charCounter.exceeded', function (e, editor) {
      document.getElementById('demo').innerHTML = "The character limit has been exceeded";
    });
    $('#froala-editor').on('froalaEditor.charCounter.update', function (e, editor) {
      $('#froala-editor').off('froalaEditor.charCounter.exceeded');
    });
    $('#froala-editor').froalaEditor({
      fileUploadParam: 'file_param',
      fileUploadUrl: 'http://0.0.0.0:8080/'+pathname+'/upload_file',
      fileUploadMethod: 'POST',
      fileMaxSize: 20*1024*1024,
      fileAllowedTypes: ['.doc', '.pdf', 'txt']
    });
});

$(()=>{
  $(".description-row").each((index, element)=>{
    var htmlString = $(element).children('p').text();
    $(element).children('p').html(htmlString);
  });
})

$(function() {
  $('#froala-editor').froalaEditor({
    // Set the image upload URL.
    //imageUploadURL: '/upload_image'
  })
});