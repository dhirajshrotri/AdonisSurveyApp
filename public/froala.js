$(() => { 
    var pathname = window.location.pathname;
    
    $('#froala-editor').froalaEditor({
        toolbarButtons: ['bold', 'italic', 'undo', 'redo', '|', 'insertImage', 'insertLink'],
        saveURL: 'http://0.0.0.0:8080/'+pathname,
        iframe: true,
        // Set maximum number of characters.
        charCounterMax: 1000,
      });
      $('#froala-editor').on('froalaEditor.charCounter.exceeded', function (e, editor) {
        document.getElementById('demo').innerHTML = "The character limit has been exceeded";
      });
      $('.selector').on('froalaEditor.charCounter.update', function (e, editor) {
        $('.selector').off('froalaEditor.charCounter.exceeded');
      });
});