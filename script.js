// تهيئة مخطط السيارة باستخدام Fabric.js
const carCanvas = new fabric.Canvas('carCanvas');
let carImage;

// تحميل صورة السيارة (يجب توفير صورة سيارة بصيغة PNG)
fabric.Image.fromURL('car.png', (img) => {
    carImage = img;
    carImage.scaleToWidth(500);
    carCanvas.add(carImage);
    carCanvas.renderAll();
});

// أجزاء السيارة للسمكرة
const carParts = [
    { name: 'باب يمين أمامي', value: 'front_right_door', x: 100, y: 100, width: 80, height: 40 },
    { name: 'باب يسار أمامي', value: 'front_left_door', x: 180, y: 100, width: 80, height: 40 },
    { name: 'باب يمين خلفي', value: 'rear_right_door', x: 100, y: 150, width: 80, height: 40 },
    { name: 'باب يسار خلفي', value: 'rear_left_door', x: 180, y: 150, width: 80, height: 40 },
    { name: 'غطاء المحرك', value: 'hood', x: 200, y: 50, width: 100, height: 50 },
    { name: 'الشنطة', value: 'trunk', x: 200, y: 200, width: 100, height: 50 },
    { name: 'رفرف أمامي يمين', value: 'front_right_fender', x: 80, y: 50, width: 60, height: 40 },
    { name: 'رفرف أمامي يسار', value: 'front_left_fender', x: 260, y: 50, width: 60, height: 40 },
    { name: 'رفرف خلفي يمين', value: 'rear_right_fender', x: 80, y: 200, width: 60, height: 40 },
    { name: 'رفرف خلفي يسار', value: 'rear_left_fender', x: 260, y: 200, width: 60, height: 40 },
    { name: 'صدام أمامي', value: 'front_bumper', x: 150, y: 20, width: 100, height: 30 },
    { name: 'صدام خلفي', value: 'rear_bumper', x: 150, y: 250, width: 100, height: 30 },
    { name: 'السقف', value: 'roof', x: 150, y: 80, width: 100, height: 50 }
];

carParts.forEach(part => {
    const rect = new fabric.Rect({
        left: part.x,
        top: part.y,
        width: part.width,
        height: part.height,
        fill: 'transparent',
        stroke: 'red',
        strokeWidth: 2,
        selectable: false,
        opacity: 0.5
    });
    const text = new fabric.Text(part.name, {
        left: part.x + 5,
        top: part.y + 5,
        fontSize: 12,
        fill: 'black',
        selectable: false
    });
    carCanvas.add(rect, text);

    rect.on('mousedown', () => {
        rect.set({ fill: rect.fill === 'transparent' ? 'rgba(255,0,0,0.3)' : 'transparent' });
        carCanvas.renderAll();
        // تحديث مربع الاختيار المرتبط
        const checkbox = document.querySelector(`input[value="${part.value}"]`);
        if (checkbox) checkbox.checked = rect.fill !== 'transparent';
    });
});

// إضافة بنود ديناميكية
document.getElementById('addBodywork').addEventListener('click', () => {
    const table = document.getElementById('bodyworkTable');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" name="partName"></td>
        <td><input type="checkbox" name="part" value="custom_bodywork_${Date.now()}"></td>
        <td><input type="text" name="description"></td>
        <td><input type="number" name="cost" class="cost" min="0"></td>
    `;
    table.appendChild(row);
    document.querySelectorAll('.cost').forEach(input => input.addEventListener('input', updateTotal));
});

document.getElementById('addPaint').addEventListener('click', () => {
    const table = document.getElementById('paintTable');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" name="partName"></td>
        <td><input type="checkbox" name="part" value="custom_paint_${Date.now()}"></td>
        <td><input type="text" name="paintType"></td>
        <td><input type="number" name="cost" class="cost" min="0"></td>
    `;
    table.appendChild(row);
    document.querySelectorAll('.cost').forEach(input => input.addEventListener('input', updateTotal));
});

document.getElementById('addMechanics').addEventListener('click', () => {
    const table = document.getElementById('mechanicsTable');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" name="partName"></td>
        <td><input type="checkbox" name="part" value="custom_mechanics_${Date.now()}"></td>
        <td><input type="text" name="description"></td>
        <td><input type="number" name="cost" class="cost" min="0"></td>
    `;
    table.appendChild(row);
    document.querySelectorAll('.cost').forEach(input => input.addEventListener('input', updateTotal));
});

document.getElementById('addAssembly').addEventListener('click', () => {
    const table = document.getElementById('assemblyTable');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" name="partName"></td>
        <td><input type="checkbox" name="part" value="custom_assembly_${Date.now()}"></td>
        <td><input type="text" name="description"></td>
        <td><input type="number" name="cost" class="cost" min="0"></td>
    `;
    table.appendChild(row);
    document.querySelectorAll('.cost').forEach(input => input.addEventListener('input', updateTotal));
});

document.getElementById('addElectrical').addEventListener('click', () => {
    const table = document.getElementById('electricalTable');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" name="partName"></td>
        <td><input type="checkbox" name="part" value="custom_electrical_${Date.now()}"></td>
        <td><input type="text" name="description"></td>
        <td><input type="number" name="cost" class="cost" min="0"></td>
    `;
    table.appendChild(row);
    document.querySelectorAll('.cost').forEach(input => input.addEventListener('input', updateTotal));
});

document.getElementById('addSparePart').addEventListener('click', () => {
    const table = document.getElementById('sparePartsTable');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" name="sparePartName"></td>
        <td><input type="number" name="sparePartQuantity" min="1"></td>
        <td><input type="number" name="sparePartPrice" class="cost" min="0"></td>
        <td><input type="text" name="sparePartType"></td>
    `;
    table.appendChild(row);
    document.querySelectorAll('.cost').forEach(input => input.addEventListener('input', updateTotal));
});

// حساب الإجمالي
function updateTotal() {
    let total = 0;
    document.querySelectorAll('.cost').forEach(input => {
        total += parseFloat(input.value) || 0;
    });
    document.getElementById('totalCost').textContent = total.toFixed(2);
}

document.querySelectorAll('.cost').forEach(input => {
    input.addEventListener('input', updateTotal);
});

// التوقيع الإلكتروني
const signatureCanvas = document.getElementById('signatureCanvas');
const ctx = signatureCanvas.getContext('2d');
let drawing = false;

signatureCanvas.addEventListener('mousedown', () => { drawing = true; });
signatureCanvas.addEventListener('mouseup', () => { drawing = false; ctx.beginPath(); });
signatureCanvas.addEventListener('mousemove', draw);

function draw(event) {
    if (!drawing) return;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

document.getElementById('clearSignature').addEventListener('click', () => {
    ctx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
});

// تصدير PDF
document.getElementById('downloadPDF').addEventListener('click', () => {
    const element = document.getElementById('formContainer');
    html2pdf()
        .set({
            margin: 10,
            filename: 'مقايسة_بطاح_الأصلي.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        .from(element)
        .save();
});

// إرسال الاستمارة
document.getElementById('repairForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data); // يمكنك إرسال البيانات إلى خادم هنا
    alert('تم إرسال الاستمارة بنجاح!');
});