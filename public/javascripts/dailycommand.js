$(function(){
        $('#c_save').on('click',function(event){
            console.log('click');
            var data = {};
            data=JSON.parse($('#c_editor').val());
            console.log($('#c_editor').val());
            $.ajax({
              type: "POST",
              url: '/dailycommand/insert',
              data: data
              // success: function (data, textStatus){
              //      if(data.success){
              //        $('#msg').html('成功保存!');
              //        $('#msg').addClass('alert alert-success');
              //        // $(location).attr('href','/movie/'+mdata.name);
              //      } else {
              //        $('#msg').html(data.err);
              //        $('#msg').addClass('alert alert-error');
              //      }
              // }
            });
        });
        $('#c_search').on('click',function(event){
            var data={};
            data['content'] = $('#c_editor').val();
            $.ajax({
              type: "POST",
              url: '/dailycommand/search',
              data: data,
              success: function (array, status){
                  if(status='success'){
                    array.forEach(function(data){
                        $('#c_log').html($('#c_log').innerHTML+data.content+'\n'+data.description+'\n');
                    })
                    
                    // $('#c_log').addClass('alert alert-success');
                    // $(location).attr('href','/movie/'+mdata.name);
                  } else {
                    $('#c_log').html(status);
                    // $('#msg').addClass('alert alert-error');
                  }
              }
            });
        });
})
