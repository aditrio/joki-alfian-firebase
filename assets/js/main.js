
var data_id = [];
var i = 1;
$(document).ready(function($) {

    var data = firebase.database().ref('/mahasiswa');

    data.on('value', (snapshot) => {

        item = snapshot.val();
        $.each(item,function(index) {

            fetchData(item[index],i);
            i++; 
            
        });

        

        // $.each(item['tugas'], function(index) {
        //     loopData(item['tugas'][index]);

        // });

    });



});



$('#btn-submit').click(function(event) {

    var _nama = $('#_nama').val();
    var _nim = $('#_nim').val();
    
    var _id = firebase.database().ref('/mahasiswa/').push().key;

    var data = {

        nama: _nama,
        nim: _nim,       
        id: _id,
        nilai: "belum ada / 0"
    }
    $('#_nama').val("");
    $('#_nim').val("");

    submitData(data);


});


function submitData(data) {
	i = 1;
    firebase.database().ref('/mahasiswa/' + data['id']).set(data);

}


function fetchData(data,index){
	var data_absensi ;
	if(data_id.includes(data['id'])){

		return;

	}else {

		        var html = "<tr>"
                    +"<td scope='row'>"+index+"</td>"
                    +"<td>"+data['nama']+"</td>"
                    +"<td>"+data['nim']+"</td>"
                    +"<td>"+data['nilai']+"</td>"
                  
                    +"<td>"
                    	+"<button class='btn btn-sm btn-info' data-toggle='modal' onclick='getData(\""+data['id']+"\")' data-target='#editModal'>Edit</button>"
                    	+"<button class='btn btn-sm btn-danger ml-1 btn-delete' onclick='deleteData(\""+data['id']+"\")' >Hapus</button>"
                    +'</td>'
               +"</tr>";

               var dash = "<tr>"
               +"<td scope='row'>"+index+"</td>"
               +"<td>"+data['nama']+"</td>"
               +"<td>"+data['nim']+"</td>"
               +"<td>"+data['nilai']+"</td>"
               +"</tr>";
        
               var nilai = "<tr>"
               +"<td scope='row'>"+index+"</td>"
               +"<td>"+data['nama']+"</td>"
               +"<td>"+data['nim']+"</td>"
               +"<td>"+data['nilai']+"</td>"
             
               +"<td>"
                   +"<button class='btn btn-sm btn-warning' data-toggle='modal' onclick='getInput(\""+data['id']+"\")' data-target='#inputModal'>Input / Edit nilai</button>"
               +'</td>'
                +"</tr>";

            $('#list-mahasiswa').append(html);
            $('#list-nilai').append(nilai);
            $('#list-dashboard').append(dash);

    }
    
    data_id.push(data['id']);
    $('#total-mahasiswa').text(data_id.length);

}


function getData(id)
{
	var data = [];
	firebase.database().ref('/mahasiswa/' + id).once('value').then((snapshot)=>{

		data.push(snapshot.val());
		$('#_namaEdit').val(data[0]['nama']);
		$('#_nimEdit').val(data[0]['nim']);
		$('#_idEdit').val(data[0]['id']);

			
	});	

}

function getInput(id){
    var data = [];
	firebase.database().ref('/mahasiswa/' + id).once('value').then((snapshot)=>{

		data.push(snapshot.val());
		$('#_nilaiInput').val(data[0]['nilai']);
		$('#_idInput').val(data[0]['id']);

			
	});	
}

function inputNilai(){

    var _id = $('#_idInput').val();
    var _nilai = $('#_nilaiInput').val();

    var data = {

        nilai: _nilai, 
    	
    }

    firebase.database().ref('/mahasiswa/' + _id).update(data);
    $('#_nilaiInput').val('');
    window.location.reload();
}


function updateData()
{


	var _nama = $('#_namaEdit').val();
    var _nim = $('#_nimEdit').val();
	var _id = $('#_idEdit').val();

    

    var data = {

        nama: _nama,
        nim: _nim,     
    	
    }
    $('#_namaEdit').val('');
    $('#_nimEdit').val('');
	$('#_idEdit').val('');

    firebase.database().ref('/mahasiswa/' + _id).update(data);

    window.location.reload();


}



function deleteData(id)
{
    firebase.database().ref('/mahasiswa/' + id).remove();
    window.location.reload();


}

