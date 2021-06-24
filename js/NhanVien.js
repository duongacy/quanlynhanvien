class NhanVien {
    constructor(manv = "", tennv = "", chucvu = "", hesochucvu = 0, luongcb = "", soGioLamTrongThang = "") {
        this.maNhanVien = manv;
        this.tenNhanVien = tennv;
        this.chucVu = chucvu;
        this.heSoChucVu = hesochucvu;
        this.luongCoBan = luongcb;
        this.soGioLamTrongThang = soGioLamTrongThang;
    }

    tongLuong = function () {
        return this.luongCoBan * this.heSoChucVu;
    }

    xepLoai = function () {
        if (this.soGioLamTrongThang >= 120) {
            return "Xuất sắc";
        }
        if (this.soGioLamTrongThang >= 100) {
            return "Giỏi";
        }
        if (this.soGioLamTrongThang >= 80) {
            return "Khá";
        }
        if (this.soGioLamTrongThang >= 50) {
            return "Trung bình";
        }
        return "Sắp bị đuổi";
    }
}