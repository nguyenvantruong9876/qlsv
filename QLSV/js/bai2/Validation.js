function Validation() {
    this.checkEmpty = function (inputVal, spanID, message) {
        //inputVal khác rống
        //trim xõa khoảng trắng
        if (inputVal.trim() != "") {
            // hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        // không hợp lệ
        //điện câu thông báo lên ID
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;
    }
    this.checkID = function (inputVal, spanID, message, mangSV) {
        /**
         * Duyệt mảng
         * So sánh mã của từng sv với inputVal
         * nếu trùng => thông báo lỗi => return false
         * ngược lại => hợp lệ => return true
         */
        // some() => duyệt mảng, trong hàm chố tham số item, index giống max() => return true/false
        // giải sử mã chwua tồn tại
        var isExist = false;
        isExist = mangSV.some(function (sv) {
            // return kê=kết quả biểu thức so sán
            return sv.maSV === inputVal.replaceAll(" ", "");
        });
        if (isExist) {
            // mã bị trùng => dữ liệu ko hợp lệ
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        } else {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
    }
    this.checkname = function (inputVal, spanID, message) {
        var pattern = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;
        if (inputVal.match(pattern)) {
            // hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;
    }
    this.checkemail = function (inputVal, spanID, message) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputVal.match(pattern)) {
            // hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;
    }
    this.checkpassword = function (inputVal, spanID, message) {
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/;
        if (inputVal.match(pattern)) {
            // hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;
    }
    this.checkscore = function (inputVal, spanID, message) {
        var pattern = /^(\d{1,2}(\.\d{1,2})?)$/;
        if (inputVal.match(pattern) && inputVal <= 10) {
            // hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;
    }
    this.checkdropdown = function (selectID, spanID, message) {
        var indexoption = document.getElementById(selectID).selectedIndex;
        if (indexoption != 0) {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;
    }
}