const $ = value => document.querySelector(value);
const $$ = value => document.querySelectorAll(value);

(function addEventDefault() {
    hienThiDanhSachNhanVien();
    addEventAddFormSubmit();
    $("#themNhanVien").addEventListener("click", () => {
        resetForm();
    })
    removeValidateStyle();

})();

function hienThiDanhSachNhanVien() {
    const dsNhanVienPromise = axios({
        method: 'get',
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
        responseType: 'json'
    })
    dsNhanVienPromise.then(function (res) {
        if (res.data.length === 0) {
            addEmptyRow();
        }
        res.data.forEach(item => {
            let newNhanVien = new NhanVien(item.maNhanVien, item.tenNhanVien, item.chucVu, item.heSoChucVu, item.luongCoBan, item.soGioLamTrongThang);
            addTableRow(newNhanVien);
        })
    })
};
function themNhanVien() {
    let data = {
        maNhanVien: $("[name='maNhanVien']").value,
        tenNhanVien: $("[name='tenNhanVien']").value,
        chucVu: $("[name='chucVu']").selectedOptions[0].innerText,
        heSoChucVu: $("[name='chucVu']").value,
        luongCoBan: $("[name='luongCoBan']").value,
        soGioLamTrongThang: $("[name='soGioLamTrongThang']").value
    }
    const addPromise = axios({
        method: "POST",
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
        data: data
    })
    addPromise.then((res) => {
        let newNhanVienObj = new NhanVien(data.maNhanVien, data.tenNhanVien, data.chucVu,
            data.heSoChucVu, data.luongCoBan, data.soGioLamTrongThang);
        addTableRow(newNhanVienObj);
        resetForm();
    })
}
function xoaNhanVien(id) {
    const xoaNhanVienPromise = axios({
        method: "DELETE",
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${id}`
    })
    xoaNhanVienPromise.then((res) => {
        $(`#row-${id}`).remove();
    })
}
function hienThiCapNhatNhanVien(maNhanVien, tenNhanVien, heSoChucVu, luongCoBan, soGioLamTrongThang) {
    $("#nhanVienFormTitle").innerText = "Cập nhật nhân viên";
    $("[name='maNhanVien']").value = maNhanVien;
    $("[name='maNhanVien']").disabled = true;
    $("[name='tenNhanVien']").value = tenNhanVien;
    $("[name='chucVu']").value = heSoChucVu;
    $("[name='luongCoBan']").value = luongCoBan;
    $("[name='soGioLamTrongThang']").value = soGioLamTrongThang;

    let formUpdate = $("#nhanVienForm");
    formUpdate.onsubmit = (e) => {
        e.preventDefault();
        if (validateMaNhanVien() && validateTenNhanVien() && validateLuongCoBan() && validateSoGioLamTrongThang()) {
            capNhatNhanVien(maNhanVien);
        }
    }
}
function capNhatNhanVien(maNhanVien) {
    let data = {
        tenNhanVien: $("[name='tenNhanVien']").value,
        chucVu: $("[name='chucVu']").selectedOptions[0].innerText,
        heSoChucVu: $("[name='chucVu']").value,
        luongCoBan: $("[name='luongCoBan']").value,
        soGioLamTrongThang: $("[name='soGioLamTrongThang']").value
    } // đây là object chay
    const addPromise = axios({
        method: "PUT",
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTInNhanVien?maNhanVien=${maNhanVien}`,
        data: data
    })
    addPromise.then((res) => {
        let newNhanVienObj = new NhanVien(maNhanVien, data.tenNhanVien, data.chucVu,
            data.heSoChucVu, data.luongCoBan, data.soGioLamTrongThang);
        updateTableRow(newNhanVienObj); //Chỉnh sửa trực tiếp data trên table k call lại API
        resetForm();
    })
}


function resetForm() {
    $("#nhanVienFormTitle").innerText = "Thêm nhân viên";
    $("[name='maNhanVien']").value = "";
    $("[name='maNhanVien']").disabled = false;
    $("[name='tenNhanVien']").value = "";
    $("[name='chucVu']").value = 1;
    $("[name='luongCoBan']").value = "";
    $("[name='soGioLamTrongThang']").value = "";
    addEventAddFormSubmit();
}

// ============== Table handling =============
function updateTableRow(item) {
    // Khi cập nhật thông tin nhân viên, không call lại API, chỉ cập nhật lại row
    $(`#row-${item.maNhanVien}`).innerHTML = `
        <td>${item.tenNhanVien}</td>
        <th scope="row">${item.maNhanVien}</th>
        <td>${item.chucVu}</td>
        <td>${item.tongLuong()}</td>
        <td>${item.xepLoai()}</td>
        <td>
            <button class="btn btn-danger rounded-0 w-100 my-1" onclick="xoaNhanVien(${item.maNhanVien})">
                Xóa
            </button>
            <button class="btn btn-warning rounded-0 w-100 my-1" onclick="hienThiCapNhatNhanVien('${item.maNhanVien}','${item.tenNhanVien}','${item.heSoChucVu}','${item.luongCoBan}', '${item.soGioLamTrongThang}')">
                Cập nhật
            </button>
        </td>
    `
}
function addTableRow(item) {
    let newRow = `<tr id="row-${item.maNhanVien}">
        <td>${item.tenNhanVien}</td>
        <th scope="row">${item.maNhanVien}</th>
        <td>${item.chucVu}</td>
        <td>${item.tongLuong()}</td>
        <td>${item.xepLoai()}</td>
        <td>
            <button class="btn btn-danger rounded-0 w-100 my-1" onclick="xoaNhanVien(${item.maNhanVien})">
                Xóa
            </button>
            <button class="btn btn-warning rounded-0 w-100 my-1" onclick="hienThiCapNhatNhanVien('${item.maNhanVien}','${item.tenNhanVien}','${item.heSoChucVu}','${item.luongCoBan}', '${item.soGioLamTrongThang}')">
                Cập nhật
            </button>
        </td>
    </tr>`
    $("#tableNhanVien tbody").innerHTML += newRow;
}

const addEmptyRow = () => {
    $("#tableNhanVien tbody").innerHTML = "Không có nhân viên để hiển thị";
}
// End table handling


// validation
function validateMaNhanVien() {
    let inputElement = $(`[name='maNhanVien']`);
    let inputValue = inputElement.value;
    if (/^[0-9]{4,6}$/.test(inputValue)) {
        return true;
    }
    inputElement.nextElementSibling.style.display = "block";
    return false;
}

function validateTenNhanVien() {
    let inputElement = $(`[name='tenNhanVien']`);
    let inputValue = inputElement.value;
    if (/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/.test(inputValue)) {
        return true;
    }
    inputElement.nextElementSibling.style.display = "block";
    return false;
}
function validateLuongCoBan() {
    let inputElement = $(`[name='luongCoBan']`);
    let inputValue = inputElement.value;
    if (inputValue >= 1000000 && inputValue <= 20000000) {
        return true;
    }
    inputElement.nextElementSibling.style.display = "block";
    return false;
}
function validateSoGioLamTrongThang() {
    let inputElement = $(`[name='soGioLamTrongThang']`);
    let inputValue = inputElement.value;
    if (inputValue >= 50 && inputValue <= 150) {
        return true;
    }
    inputElement.nextElementSibling.style.display = "block";
    return false;
}
// end validation

// Event handling
function addEventAddFormSubmit() {
    let formAdd = $("#nhanVienForm");
    formAdd.onsubmit = (e) => {
        e.preventDefault();
        if (validateMaNhanVien() && validateTenNhanVien() && validateLuongCoBan() && validateSoGioLamTrongThang()) {
            themNhanVien();
        }
    }
}
function removeValidateStyle() {
    $$("form input").forEach(item => {
        item.onfocus = function () {
            this.style.borderColor = "#CED4DA";
            let siblingElement = this.nextElementSibling;
            siblingElement.classList.contains("invalid-feedback") && (siblingElement.style.display = "none");
        }
    })
}
// End event handling