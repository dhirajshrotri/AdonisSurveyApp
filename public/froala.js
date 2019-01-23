$(() => { 
  var pathname = window.location.pathname;
  
  $('#froala-editor').froalaEditor({
      // charCounterCount: true,
      // // Set the image upload parameter.
      // imageUploadParam: 'image_param',

      // // Set the image upload URL.
      // imageUploadURL: '/upload_image',

      // // Additional upload params.
      // imageUploadParams: {id: 'my_editor'},

      // // Set request type.
      // imageUploadMethod: 'POST',

      // // Set max image size to 5MB.
      // imageMaxSize: 5 * 1024 * 1024,

      // // Allow to upload PNG and JPG.
      // imageAllowedTypes: ['jpeg', 'jpg', 'png'],
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
    // $('#froala-editor').on('froalaEditor.image.error', function (e, editor, error, response) {
    //   console.log(error);
    //   console.log(response);
    // });
    
    $('#froala-editor').on('froalaEditor.charCounter.update', function (e, editor) {
      $('#froala-editor').off('froalaEditor.charCounter.exceeded');
    });
    // $('#froala-editor').froalaEditor({
    //   fileUploadParam: 'file_param',
    //   fileUploadUrl: 'http://0.0.0.0:8080/'+pathname+'/upload_file',
    //   fileUploadMethod: 'POST',
    //   fileMaxSize: 20*1024*1024,
    //   fileAllowedTypes: ['.doc', '.pdf', 'txt']
    // });
});

$(()=>{
  $(".description-row").each((index, element)=>{
    var htmlString = $(element).children('p').text();
    $(element).children('p').html(htmlString);
  });
})

$('#froala-editor').froalaeditor({
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
  imageAllowedTypes: ['jpeg', 'jpg', 'png']
})
.on('froalaEditor.image.beforeUpload', function (e, editor, images) {
  // Return false if you want to stop the image upload.
})
.on('froalaEditor.image.uploaded', function (e, editor, response) {
  // Image was uploaded to the server.
})
.on('froalaEditor.image.inserted', function (e, editor, $img, response) {
  // Image was inserted in the editor.
})
.on('froalaEditor.image.replaced', function (e, editor, $img, response) {
  // Image was replaced in the editor.
})
.on('froalaEditor.image.error', function (e, editor, error, response) {
  // Bad link.
  if (error.code == 1) {
    console.log(error)
   }

  // No link in upload response.
  else if (error.code == 2) { console.log(error) 
  }

  // Error during image upload.
  else if (error.code == 3) { 
    console.log(error) 
  }

  // Parsing response failed.
  else if (error.code == 4) { 
    console.log(error) 
  }

  // Image too text-large.
  else if (error.code == 5) { 
    console.log(error) 
  }

  // Invalid image type.
  else if (error.code == 6) { 
    console.log(error) 
  }

  // Image can be uploaded only to same domain in IE 8 and IE 9.
  else if (error.code == 7) { 
    console.log(error)
  }

  // Response contains the original server response to the request if available.
});