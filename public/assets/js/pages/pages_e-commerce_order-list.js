$(function(){var isRtl=$('body').attr('dir')==='rtl'||$('html').attr('dir')==='rtl';var statuses={1:['Shipped','success'],2:['Pending','warning'],3:['Sent','info'],4:['Cancelled','danger']};$('#order-list').dataTable({ajax:'assets/json/pages_e-commerce_order-list.json',order:[[0,'desc']],columnDefs:[{targets:[5],orderable:false,searchable:false}],createdRow:function(row,data,index){$('td',row).addClass('align-middle');$('td',row).eq(2).html('').append(numeral(data[2]).format('$0,0.00'));$('td',row).eq(4).html('').append('<span class="badge badge-outline-'+statuses[data[4]][1]+'">'+statuses[data[4]][0]+'</span>');$('td',row).eq(5).addClass('text-nowrap').html('').append('<a href="javascript:void(0)" class="btn btn-default btn-xs icon-btn btn-md-flat order-tooltip" title="Show"><i class="ion ion-md-eye"></i></a>&nbsp;'+
'<a href="javascript:void(0)" class="btn btn-default btn-xs icon-btn btn-md-flat order-tooltip" title="Edit"><i class="ion ion-md-create"></i></a>');}});$('body').tooltip({selector:'.order-tooltip'});});