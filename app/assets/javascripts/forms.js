$(function(){
    $("#registerForm").validate({
        rules: {
            "user[first_name]":"required",
            "user[last_name]":"required",
            "user[email]":{required: true,email: true},
            "user[password]":{required: true, minlength:8},
            "user[password_confirmation]":{required:true,equalTo: "#user_password_confirmation"},
            "group_name":"required"
        }
    });
    
    $("#addUserForm").validate({
        rules: {
            "user[first_name]":"required",
            "user[last_name]":"required",
            "user[email]":{required: true,email: true},
            "user[role]":"required"            
        }
    });
    
});
