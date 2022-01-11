window.showNotification = () => {
    window
        .Toastify({
            text: 'Заявка успешно отправлена!',
            duration: 5000,
            close: true,            
            position: 'left', // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
        })
        .showToast();
};

const validation = new JustValidate('#form', {
    errorFieldCssClass: 'is-invalid',
    errorFieldStyle: {
        border: '1px solid red',
    },
    errorLabelCssClass: 'is-label-invalid',
    errorLabelStyle: {
        color: 'red',
    },
    focusInvalidField: true,
    lockForm: true,
});

validation    
    .addField('#name', [
        {
            rule: 'required',
            errorMessage: 'Введите имя',
        },
        {
            rule: 'customRegexp',
            value: /^[A-zА-яЁё_ ]+$/i,
            errorMessage: 'Недопустимый формат',            
        },                           
    ])
    .addField('#phone', [
        {
            rule: 'required',
            errorMessage: 'Введите телефон',
        },        
    ])
    .onSuccess((ev) => {
        ev.preventDefault();
        window.showNotification();
        this.form.reset();        
    })
    
    
