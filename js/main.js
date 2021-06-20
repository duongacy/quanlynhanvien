const $ = document.querySelector.bind(document);

loadListNhanVien();
addEventShowAddForm();
function loadListNhanVien() {
    const listNhanVien = [];
    let promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
        method: 'GET'
    })
    promise.then(function (result) {
        result.data.forEach(function (item) {
            let newNhanVien = new NhanVien(item.maNhanVien, item.tenNhanVien, item.chucVu, item.heSoChucVu, item.luongCoBan, item.soGioLamTrongThang)
            listNhanVien.push(newNhanVien);
        })
        renderTableNhanVien(listNhanVien);
    })
}

function renderTableNhanVien(listNhanVien) {
    $("#listNhanVienTable tbody").innerHTML ="";
    listNhanVien.forEach(function (item) {
        $("#listNhanVienTable tbody").innerHTML += `
            <tr>
                <td>${item.maNhanVien}</td>
                <td>${item.tenNhanVien}</td>
                <td>${item.chucVu}</td>
                <td>${item.luongCoBan}</td>
                <td> ${item.soGioLamTrongThang}</td>
                <td>
                    <button class="btn btn-danger btn-sm">Xóa</button>
                    <button class="btn btn-warning btn-sm" onclick='showUpdateForm(${item.maNhanVien})'>Cập nhật</button>
                </td>
            </tr>
        `
    })
}

function addEventShowAddForm(){
    $("#show-add-form").addEventListener("click", function(){
        $("#add_container").style.display = "block";
        $("#update_container").style.display = "none";
    })
}
function showUpdateForm(manv){
    $("#add_container").style.display = "none";
    $("#update_container").style.display = "block";
    console.log(manv)
}
