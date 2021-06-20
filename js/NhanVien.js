function NhanVien(manv, tennv, chucvu, hesochucvu, luongcb, sogiolam) {
    this.maNhanVien = manv;
    this.tenNhanVien = tennv;
    this.chucVu = chucvu;
    this.heSoChucVu = hesochucvu;
    this.luongCoBan = luongcb;
    this.soGioLamTrongThang = sogiolam;

    this.tinhLuong = function () {
        if (this.chucVu === "GD") {
            return this.luongCoBan * 3;
        }
        if (this.chucVu === "TP") {
            return this.luongCoBan * 2;
        }
        if (this.chucVu === "NV") {
            return this.luongCoBan;
        }
    }

    this.xepLoai = function(){
        if(this.soGioLamTrongThang >=120){
            return "Xuất sắc";
        }
        if(this.soGioLamTrongThang >=100){
            return "Giỏi";
        }
        if(this.soGioLamTrongThang >=80){
            return "Khá";
        }
        if(this.soGioLamTrongThang >=50){
            return "Xuất sắc";
        }
        return "Không xác định";
    }
}