$(function(){
        $('#c_save').on('click',function(event){
            console.log('click');
            var data = {};
            data=JSON.parse($('#c_editor').val());
            console.log($('#c_editor').val());
            $.ajax({
              type: "POST",
              url: '/dailycommand/insert',
              data: data,
              success: function (data, status){
                   if(status=='success'){
                     $('#c_log').html('成功保存!');
                     $('#c_log').addClass('alert alert-success');
                     // $(location).attr('href','/movie/'+mdata.name);
                   } else {
                     $('#c_log').html(data.err);
                     $('#c_log').addClass('alert alert-error');
                   }
              }
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
                  if(status=='success'){
                    $('#c_list').html('Results')
                    array.forEach(function(data){
                          // $("#wordlist").append('<li id="wordlist_' + escape4id(word) + '"><div class="delete" title="Remove from word list"></div>' + word + "</li>");
                          if(data.ref!=undefined&&data.code!=undefined){
                           $('#c_list').append('<li><p>' + data.content + '</p><p>' +data.description +'</p><p>' +data.ref +'</p><p>' +data.code +'</p></li>');

                          }
                          else{
                           $('#c_list').append('<li><p>' + data.content + '</p><p>' +data.description +'</p></li>');
                          }
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
