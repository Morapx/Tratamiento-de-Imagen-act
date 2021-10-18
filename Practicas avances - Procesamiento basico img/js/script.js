const imgElement = document.getElementById('imgSrc');
const inputElement = document.getElementById('fileInput');

inputElement.addEventListener('change', (e) => {
    imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);

const process = () => {
    const mat = cv.imread(imgElement);
    const mat_result = new cv.Mat();
    const filter = parseInt($("#filter").val());

    switch (filter) {
        case 1:
            {
                const value = parseInt($("#value").val());
                cv.threshold(mat, mat_result, value, 255, cv.THRESH_BINARY);
                break;
            }
        case 2:
            {
                const value = parseInt($("#value_2").val());
                const ksize = new cv.Size(value, value);
                cv.GaussianBlur(mat, mat_result, ksize, 0, 0, cv.BORDER_DEFAULT);
                break;
            }
        case 3:
            {
                const value1 = parseInt($("#value_3_1").val());
                const value2 = parseInt($("#value_3_2").val());
                const value_Aperture = parseInt($("#value_3").val());
                cv.Canny(mat, mat_result, value1, value2, value_Aperture);
                break;
            }
        case 4:
            {
                cv.cvtColor(mat, mat, cv.COLOR_BGR2GRAY);
                cv.equalizeHist(mat, mat_result);
                break;
            }
    }
    cv.imshow('canvasOutput', mat_result);
    mat.delete();
    mat_result.delete();
}


//Cargo bien
const onOpenCvReady = () => {
    document.getElementById('status').innerHTML = '<b>OpenCV Cargo Correctamente';
    $("#cv_start").show();
    $("#main_process").show();
    $("#cv_start").click(process);
    $("#main_process").show();

    $("#filter").change(function() {
        const filter = parseInt($("#filter").val());
        $(".step_blocks").hide();
        $("#step3_" + filter).show();
    });

    //Threshold
    $("#value").change(function() {
        $("#value_sel").html($(this).val());
        process();
    })

    //GaussianBlur
    $("#value_2").change(function() {
        $("#value_2_sel").html($(this).val() + "x" + $(this).val());
        process();
    })

    //Canny
    $("#value_3_1").change(function() {
        $("#value_3_1_sel").html($(this).val());
        process();
    })

    $("#value_3_2").change(function() {
        $("#value_3_2_sel").html($(this).val());
        process();
    })

    $("#value_3").change(function() {
        $("#value_3_sel").html($(this).val());
        process();
    })
}

//Cargo mal
const onOpenCvError = () => {
    const element = document.getElementById('status');
    element.setAttribute('class', 'err');
    element.innerHTML = 'Fallo la carga de OpenCv.js';
}