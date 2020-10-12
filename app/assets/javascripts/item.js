$(function(){
  console.log('item.js');

  // 画像用のinputを生成する関数
  const buildFileField = (num)=> {
    const html = `<div class="js-file_group">
                    <input class="js-file" type="file"
                    name="product[images_attributes][${num}][url]"
                    id="product_images_attributes_${num}_url" data-index="${num}" ><br>
                    
                  </div>`;
    return html;
  }

  // プレビュー用のimgタグを生成する関数
  const buildImg = (index, url)=> {
    const html = `<img data-index="${index}" src="${url}" style="width: 20%; height: 100%; flex-shrink: 0;">`;
    return html;
  }

  const deletebtn = (index, url)=> {
    const html = `<div class="js-remove"id="delete_btn_${index}" data-index="${index}">削除</div>`;
    return html
  }

  $('#image-select-btn').on('click', function(e) {
    console.log("click");
    const fileFields = $('input[type="file"]:last');
    fileFields.trigger('click');
  });


  $('.hidden-destroy').hide();

  $('#image-file-fileds').on('change', 'input[type="file"]', function(e) {
    console.log(this);
    // const targetIndex = $(this).parent().data('index');
    // ファイルのブラウザ上でのURLを取得する
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);
    console.log("Blob:", blobUrl);
    let targetIndex = $(this).data('index');

    $('#image-select-btn').before(buildImg(targetIndex, blobUrl));

    $('#image-select-btn').after(deletebtn(targetIndex, blobUrl));
    // after, before, prepend, append

    
    $('#image-file-fileds').append(buildFileField(targetIndex+1));

  });

  $('#previews').on('click', '.js-remove', function() {
    const targetIndex = $(this).data('index');
    // 該当indexを振られているチェックボックスを取得する
    console.log(targetIndex)
    const hiddenCheck = $(`input[data-index="${targetIndex}"].hidden-destroy`);

    $(`#product_images_attributes_${targetIndex}_url`).remove()
    // もしチェックボックスが存在すればチェックを入れる
    if (hiddenCheck) hiddenCheck.prop('checked', true);

    $(this).remove();
    
    $(`img[data-index="${targetIndex}"]`).remove();

    // 画像入力欄が0個にならないようにしておく
    if ($('.js-file').length == 0) $('#image-box').append(buildFileField(fileIndex[0]));
  });
  

});



