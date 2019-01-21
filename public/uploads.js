$(()=>{
    $('#froala-editor').editable({
        //set the image upload URL.
        imageUploadURL: '/image_upload',
        //set the image upload parameter
        imageUploadParam: {
            id: 'file'
        }
    })
});