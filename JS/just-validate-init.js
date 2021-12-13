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
    ]);

