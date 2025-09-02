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
        <td><input type="number" name="sparePartQuantity" class="quantity" min="1"></td>
        <td><input type="number" name="sparePartPrice" class="price" min="0"></td>
        <td><span class="totalPrice">0</span> ج.م</td>
        <td><input type="text" name="sparePartType"></td>
    `;
    table.appendChild(row);
    bindSparePartEvents();
    updateTotal();
});

// ربط الأحداث لحساب تكلفة قطع الغيار
function bindSparePartEvents() {
    document.querySelectorAll('.quantity, .price').forEach(input => {
        input.addEventListener('input', () => {
            const row = input.closest('tr');
            const quantity = parseFloat(row.querySelector('.quantity').value) || 0;
            const price = parseFloat(row.querySelector('.price').value) || 0;
            const totalPrice = row.querySelector('.totalPrice');
            totalPrice.textContent = (quantity * price).toFixed(2);
            updateTotal();
        });
    });
}

bindSparePartEvents();

// حساب الإجمالي الكلي
function updateTotal() {
    let total = 0;
    // تكاليف الإصلاحات
    document.querySelectorAll('.cost').forEach(input => {
        total += parseFloat(input.value) || 0;
    });
    // تكاليف قطع الغيار (الكمية × السعر)
    document.querySelectorAll('#sparePartsTable tr').forEach(row => {
        const quantity = parseFloat(row.querySelector('.quantity').value) || 0;
        const price = parseFloat(row.querySelector('.price').value) || 0;
        total += quantity * price;
    });
    document.getElementById('totalCost').textContent = total.toFixed(2);
}

document.querySelectorAll('.cost').forEach(input => {
    input.addEventListener('input', updateTotal);
});

// طباعة المقايسة النهائية
document.getElementById('printSelected').addEventListener('click', () => {
    const printContainer = document.createElement('div');
    printContainer.className = 'container print-container';

    printContainer.innerHTML = `
        <header>
            <img src="logo.png" alt="شعار بطاح الأصلي" class="logo">
            <h1>مقايسة صيانة توكيل بطاح الأصلي</h1>
            <p>العنوان: وسط البلد - بجوار سينما ريفولي - القاهرة</p>
            <p>رقم الهاتف: 1234-567-890 | البريد: info@batah.com</p>
        </header>
    `;

    const form = document.getElementById('repairForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // الصفحة الأولى: بيانات العميل والسيارة، الاستلام والتسليم، الصنايعية
    printContainer.innerHTML += `
        <div class="row">
            <section class="col">
                <h2>بيانات العميل</h2>
                <p><strong>الاسم:</strong> ${data.clientName || 'غير محدد'}</p>
                <p><strong>رقم الهاتف:</strong> ${data.clientPhone || 'غير محدد'}</p>
                <p><strong>البريد الإلكتروني:</strong> ${data.clientEmail || 'غير محدد'}</p>
                <p><strong>العنوان:</strong> ${data.clientAddress || 'غير محدد'}</p>
            </section>
            <section class="col">
                <h2>بيانات السيارة</h2>
                <p><strong>الماركة:</strong> ${data.carBrand || 'غير محدد'}</p>
                <p><strong>الموديل:</strong> ${data.carModel || 'غير محدد'}</p>
                <p><strong>سنة الصنع:</strong> ${data.carYear || 'غير محدد'}</p>
                <p><strong>رقم اللوحة:</strong> ${data.carPlate || 'غير محدد'}</p>
                <p><strong>رقم الشاسيه:</strong> ${data.carVIN || 'غير محدد'}</p>
                <p><strong>عداد الكيلومترات:</strong> ${data.carMileage || 'غير محدد'}</p>
            </section>
        </div>
        <div class="row">
            <section class="col">
                <h2>تفاصيل الاستلام والتسليم</h2>
                <p><strong>تاريخ الاستلام:</strong> ${data.receiveDate || 'غير محدد'}</p>
                <p><strong>وقت الاستلام:</strong> ${data.receiveTime || 'غير محدد'}</p>
                <p><strong>اسم من قام بالاستلام:</strong> ${data.receiverName || 'غير محدد'}</p>
                <p><strong>تاريخ التسليم:</strong> ${data.deliveryDate || 'غير محدد'}</p>
                <p><strong>وقت التسليم:</strong> ${data.deliveryTime || 'غير محدد'}</p>
                <p><strong>اسم من قام بالتسليم:</strong> ${data.delivererName || 'غير محدد'}</p>
                <p><strong>اسم مهندس الصيانة:</strong> ${data.engineerName || 'غير محدد'}</p>
            </section>
            <section class="col">
                <h2>أسماء الصنايعية</h2>
                ${[1, 2, 3, 4, 5, 6].map(i => data[`worker${i}`] ? `<p><strong>صانعي ${i}:</strong> ${data[`worker${i}`]}</p>` : '').join('')}
            </section>
        </div>
        <div class="page-break"></div>
    `;

    // الصفحة الثانية: الإصلاحات وقطع الغيار
    let bodyworkRows = '';
    document.querySelectorAll('#bodyworkTable tr').forEach(row => {
        const checkbox = row.querySelector('input[name="part"]');
        const cost = row.querySelector('input[name="cost"]').value;
        if (checkbox && checkbox.checked && cost && parseFloat(cost) > 0) {
            const partName = row.querySelector('td:first-child').textContent || row.querySelector('input[name="partName"]')?.value || 'غير محدد';
            const description = row.querySelector('input[name="description"]').value;
            bodyworkRows += `
                <tr>
                    <td>${partName}</td>
                    <td>${description || 'غير محدد'}</td>
                    <td>${cost} ج.م</td>
                </tr>
            `;
        }
    });
    if (bodyworkRows) {
        printContainer.innerHTML += `
            <section>
                <h3>سمكرة</h3>
                <table>
                    <thead>
                        <tr>
                            <th>الجزء</th>
                            <th>الوصف</th>
                            <th>التكلفة (ج.م)</th>
                        </tr>
                    </thead>
                    <tbody>${bodyworkRows}</tbody>
                </table>
            </section>
        `;
    }

    let paintRows = '';
    document.querySelectorAll('#paintTable tr').forEach(row => {
        const checkbox = row.querySelector('input[name="part"]');
        const cost = row.querySelector('input[name="cost"]').value;
        if (checkbox && checkbox.checked && cost && parseFloat(cost) > 0) {
            const partName = row.querySelector('td:first-child').textContent || row.querySelector('input[name="partName"]')?.value || 'غير محدد';
            const paintType = row.querySelector('input[name="paintType"]').value;
            paintRows += `
                <tr>
                    <td>${partName}</td>
                    <td>${paintType || 'غير محدد'}</td>
                    <td>${cost} ج.م</td>
                </tr>
            `;
        }
    });
    if (paintRows) {
        printContainer.innerHTML += `
            <section>
                <h3>رش</h3>
                <table>
                    <thead>
                        <tr>
                            <th>الجزء</th>
                            <th>نوع الرذاذ</th>
                            <th>التكلفة (ج.م)</th>
                        </tr>
                    </thead>
                    <tbody>${paintRows}</tbody>
                </table>
            </section>
        `;
    }

    let mechanicsRows = '';
    document.querySelectorAll('#mechanicsTable tr').forEach(row => {
        const checkbox = row.querySelector('input[name="part"]');
        const cost = row.querySelector('input[name="cost"]').value;
        if (checkbox && checkbox.checked && cost && parseFloat(cost) > 0) {
            const partName = row.querySelector('td:first-child').textContent || row.querySelector('input[name="partName"]')?.value || 'غير محدد';
            const description = row.querySelector('input[name="description"]').value;
            mechanicsRows += `
                <tr>
                    <td>${partName}</td>
                    <td>${description || 'غير محدد'}</td>
                    <td>${cost} ج.م</td>
                </tr>
            `;
        }
    });
    if (mechanicsRows) {
        printContainer.innerHTML += `
            <section>
                <h3>ميكانيكا</h3>
                <table>
                    <thead>
                        <tr>
                            <th>القسم</th>
                            <th>الوصف</th>
                            <th>التكلفة (ج.م)</th>
                        </tr>
                    </thead>
                    <tbody>${mechanicsRows}</tbody>
                </table>
            </section>
        `;
    }

    let assemblyRows = '';
    document.querySelectorAll('#assemblyTable tr').forEach(row => {
        const checkbox = row.querySelector('input[name="part"]');
        const cost = row.querySelector('input[name="cost"]').value;
        if (checkbox && checkbox.checked && cost && parseFloat(cost) > 0) {
            const partName = row.querySelector('td:first-child').textContent || row.querySelector('input[name="partName"]')?.value || 'غير محدد';
            const description = row.querySelector('input[name="description"]').value;
            assemblyRows += `
                <tr>
                    <td>${partName}</td>
                    <td>${description || 'غير محدد'}</td>
                    <td>${cost} ج.م</td>
                </tr>
            `;
        }
    });
    if (assemblyRows) {
        printContainer.innerHTML += `
            <section>
                <h3>فك وتركيب</h3>
                <table>
                    <thead>
                        <tr>
                            <th>النوع</th>
                            <th>الوصف</th>
                            <th>التكلفة (ج.م)</th>
                        </tr>
                    </thead>
                    <tbody>${assemblyRows}</tbody>
                </table>
            </section>
        `;
    }

    let electricalRows = '';
    document.querySelectorAll('#electricalTable tr').forEach(row => {
        const checkbox = row.querySelector('input[name="part"]');
        const cost = row.querySelector('input[name="cost"]').value;
        if (checkbox && checkbox.checked && cost && parseFloat(cost) > 0) {
            const partName = row.querySelector('td:first-child').textContent || row.querySelector('input[name="partName"]')?.value || 'غير محدد';
            const description = row.querySelector('input[name="description"]').value;
            electricalRows += `
                <tr>
                    <td>${partName}</td>
                    <td>${description || 'غير محدد'}</td>
                    <td>${cost} ج.م</td>
                </tr>
            `;
        }
    });
    if (electricalRows) {
        printContainer.innerHTML += `
            <section>
                <h3>أعمال كهربائية</h3>
                <table>
                    <thead>
                        <tr>
                            <th>الجزء</th>
                            <th>الوصف</th>
                            <th>التكلفة (ج.م)</th>
                        </tr>
                    </thead>
                    <tbody>${electricalRows}</tbody>
                </table>
            </section>
        `;
    }

    let sparePartsRows = '';
    document.querySelectorAll('#sparePartsTable tr').forEach(row => {
        const quantity = parseFloat(row.querySelector('.quantity').value) || 0;
        const price = parseFloat(row.querySelector('.price').value) || 0;
        if (quantity * price > 0) {
            const name = row.querySelector('input[name="sparePartName"]').value;
            const type = row.querySelector('input[name="sparePartType"]').value;
            sparePartsRows += `
                <tr>
                    <td>${name || 'غير محدد'}</td>
                    <td>${quantity || 'غير محدد'}</td>
                    <td>${price} ج.م</td>
                    <td>${(quantity * price).toFixed(2)} ج.م</td>
                    <td>${type || 'غير محدد'}</td>
                </tr>
            `;
        }
    });
    if (sparePartsRows) {
        printContainer.innerHTML += `
            <section>
                <h3>مشتريات قطع الغيار</h3>
                <table>
                    <thead>
                        <tr>
                            <th>اسم الصنف</th>
                            <th>الكمية</th>
                            <th>السعر للوحدة (ج.م)</th>
                            <th>الإجمالي (ج.م)</th>
                            <th>النوع</th>
                        </tr>
                    </thead>
                    <tbody>${sparePartsRows}</tbody>
                </table>
            </section>
        `;
    }

    if (data.notes) {
        printContainer.innerHTML += `
            <section>
                <h3>ملاحظات إضافية</h3>
                <p>${data.notes}</p>
            </section>
        `;
    }

    printContainer.innerHTML += `
        <section>
            <p><strong>الإجمالي الكلي:</strong> <span id="totalCost">${document.getElementById('totalCost').textContent}</span> ج.م</p>
        </section>
        <section>
            <h3>توقيع مدير المركز</h3>
            <div class="signature-box"></div>
        </section>
        <footer>
            <p>توكيل بطاح الأصلي - وسط البلد - بجوار سينما ريفولي - القاهرة</p>
        </footer>
    `;

    document.body.appendChild(printContainer);
    window.print();
    document.body.removeChild(printContainer);
});

// تصدير PDF
document.getElementById('downloadPDF').addEventListener('click', () => {
    const printContainer = document.createElement('div');
    printContainer.className = 'container print-container';

    printContainer.innerHTML = `
        <header>
            <img src="logo.png" alt="شعار بطاح الأصلي" class="logo">
            <h1>مقايسة صيانة توكيل بطاح الأصلي</h1>
            <p>العنوان: وسط البلد - بجوار سينما ريفولي - القاهرة</p>
            <p>رقم الهاتف: 1234-567-890 | البريد: info@batah.com</p>
        </header>
    `;

    const form = document.getElementById('repairForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    printContainer.innerHTML += `
        <div class="row">
            <section class="col">
                <h2>بيانات العميل</h2>
                <p><strong>الاسم:</strong> ${data.clientName || 'غير محدد'}</p>
                <p><strong>رقم الهاتف:</strong> ${data.clientPhone || 'غير محدد'}</p>
                <p><strong>البريد الإلكتروني:</strong> ${data.clientEmail || 'غير محدد'}</p>
                <p><strong>العنوان:</strong> ${data.clientAddress || 'غير محدد'}</p>
            </section>
            <section class="col">
                <h2>بيانات السيارة</h2>
                <p><strong>الماركة:</strong> ${data.carBrand || 'غير محدد'}</p>
                <p><strong>الموديل:</strong> ${data.carModel || 'غير محدد'}</p>
                <p><strong>سنة الصنع:</strong> ${data.carYear || 'غير محدد'}</p>
                <p><strong>رقم اللوحة:</strong> ${data.carPlate || 'غير محدد'}</p>
                <p><strong>رقم الشاسيه:</strong> ${data.carVIN || 'غير محدد'}</p>
                <p><strong>عداد الكيلومترات:</strong> ${data.carMileage || 'غير محدد'}</p>
            </section>
        </div>
        <div class="row">
            <section class="col">
                <h2>تفاصيل الاستلام والتسليم</h2>
                <p><strong>تاريخ الاستلام:</strong> ${data.receiveDate || 'غير محدد'}</p>
                <p><strong>وقت الاستلام:</strong> ${data.receiveTime || 'غير محدد'}</p>
                <p><strong>اسم من قام بالاستلام:</strong> ${data.receiverName || 'غير محدد'}</p>
                <p><strong>تاريخ التسليم:</strong> ${data.deliveryDate || 'غير محدد'}</p>
                <p><strong>وقت التسليم:</strong> ${data.deliveryTime || 'غير محدد'}</p>
                <p><strong>اسم من قام بالتسليم:</strong> ${data.delivererName || 'غير محدد'}</p>
                <p><strong>اسم مهندس الصيانة:</strong> ${data.engineerName || 'غير محدد'}</p>
            </section>
            <section class="col">
                <h2>أسماء الصنايعية</h2>
                ${[1, 2, 3, 4, 5, 6].map(i => data[`worker${i}`] ? `<p><strong>صانعي ${i}:</strong> ${data[`worker${i}`]}</p>` : '').join('')}
            </section>
        </div>
        <div class="page-break"></div>
    `;

    let bodyworkRows = '';
    document.querySelectorAll('#bodyworkTable tr').forEach(row => {
        const checkbox = row.querySelector('input[name="part"]');
        const cost = row.querySelector('input[name="cost"]').value;
        if (checkbox && checkbox.checked && cost && parseFloat(cost) > 0) {
            const partName = row.querySelector('td:first-child').textContent || row.querySelector('input[name="partName"]')?.value || 'غير محدد';
            const description = row.querySelector('input[name="description"]').value;
            bodyworkRows += `
                <tr>
                    <td>${partName}</td>
                    <td>${description || 'غير محدد'}</td>
                    <td>${cost} ج.م</td>
                </tr>
            `;
        }
    });
    if (bodyworkRows) {
        printContainer.innerHTML += `
            <section>
                <h3>سمكرة</h3>
                <table>
                    <thead>
                        <tr>
                            <th>الجزء</th>
                            <th>الوصف</th>
                            <th>التكلفة (ج.م)</th>
                        </tr>
                    </thead>
                    <tbody>${bodyworkRows}</tbody>
                </table>
            </section>
        `;
    }

    let paintRows = '';
    document.querySelectorAll('#paintTable tr').forEach(row => {
        const checkbox = row.querySelector('input[name="part"]');
        const cost = row.querySelector('input[name="cost"]').value;
        if (checkbox && checkbox.checked && cost && parseFloat(cost) > 0) {
            const partName = row.querySelector('td:first-child').textContent || row.querySelector('input[name="partName"]')?.value || 'غير محدد';
            const paintType = row.querySelector('input[name="paintType"]').value;
            paintRows += `
                <tr>
                    <td>${partName}</td>
                    <td>${paintType || 'غير محدد'}</td>
                    <td>${cost} ج.م</td>
                </tr>
            `;
        }
    });
    if (paintRows) {
        printContainer.innerHTML += `
            <section>
                <h3>رش</h3>
                <table>
                    <thead>
                        <tr>
                            <th>الجزء</th>
                            <th>نوع الرذاذ</th>
                            <th>التكلفة (ج.م)</th>
                        </tr>
                    </thead>
                    <tbody>${paintRows}</tbody>
                </table>
            </section>
        `;
    }

    let mechanicsRows = '';
    document.querySelectorAll('#mechanicsTable tr').forEach(row => {
        const checkbox = row.querySelector('input[name="part"]');
        const cost = row.querySelector('input[name="cost"]').value;
        if (checkbox && checkbox.checked && cost && parseFloat(cost) > 0) {
            const partName = row.querySelector('td:first-child').textContent || row.querySelector('input[name="partName"]')?.value || 'غير محدد';
            const description = row.querySelector('input[name="description"]').value;
            mechanicsRows += `
                <tr>
                    <td>${partName}</td>
                    <td>${description || 'غير محدد'}</td>
                    <td>${cost} ج.م</td>
                </tr>
            `;
        }
    });
    if (mechanicsRows) {
        printContainer.innerHTML += `
            <section>
                <h3>ميكانيكا</h3>
                <table>
                    <thead>
                        <tr>
                            <th>القسم</th>
                            <th>الوصف</th>
                            <th>التكلفة (ج.م)</th>
                        </tr>
                    </thead>
                    <tbody>${mechanicsRows}</tbody>
                </table>
            </section>
        `;
    }

    let assemblyRows = '';
    document.querySelectorAll('#assemblyTable tr').forEach(row => {
        const checkbox = row.querySelector('input[name="part"]');
        const cost = row.querySelector('input[name="cost"]').value;
        if (checkbox && checkbox.checked && cost && parseFloat(cost) > 0) {
            const partName = row.querySelector('td:first-child').textContent || row.querySelector('input[name="partName"]')?.value || 'غير محدد';
            const description = row.querySelector('input[name="description"]').value;
            assemblyRows += `
                <tr>
                    <td>${partName}</td>
                    <td>${description || 'غير محدد'}</td>
                    <td>${cost} ج.م</td>
                </tr>
            `;
        }
    });
    if (assemblyRows) {
        printContainer.innerHTML += `
            <section>
                <h3>فك وتركيب</h3>
                <table>
                    <thead>
                        <tr>
                            <th>النوع</th>
                            <th>الوصف</th>
                            <th>التكلفة (ج.م)</th>
                        </tr>
                    </thead>
                    <tbody>${assemblyRows}</tbody>
                </table>
            </section>
        `;
    }

    let electricalRows = '';
    document.querySelectorAll('#electricalTable tr').forEach(row => {
        const checkbox = row.querySelector('input[name="part"]');
        const cost = row.querySelector('input[name="cost"]').value;
        if (checkbox && checkbox.checked && cost && parseFloat(cost) > 0) {
            const partName = row.querySelector('td:first-child').textContent || row.querySelector('input[name="partName"]')?.value || 'غير محدد';
            const description = row.querySelector('input[name="description"]').value;
            electricalRows += `
                <tr>
                    <td>${partName}</td>
                    <td>${description || 'غير محدد'}</td>
                    <td>${cost} ج.م</td>
                </tr>
            `;
        }
    });
    if (electricalRows) {
        printContainer.innerHTML += `
            <section>
                <h3>أعمال كهربائية</h3>
                <table>
                    <thead>
                        <tr>
                            <th>الجزء</th>
                            <th>الوصف</th>
                            <th>التكلفة (ج.م)</th>
                        </tr>
                    </thead>
                    <tbody>${electricalRows}</tbody>
                </table>
            </section>
        `;
    }

    let sparePartsRows = '';
    document.querySelectorAll('#sparePartsTable tr').forEach(row => {
        const quantity = parseFloat(row.querySelector('.quantity').value) || 0;
        const price = parseFloat(row.querySelector('.price').value) || 0;
        if (quantity * price > 0) {
            const name = row.querySelector('input[name="sparePartName"]').value;
            const type = row.querySelector('input[name="sparePartType"]').value;
            sparePartsRows += `
                <tr>
                    <td>${name || 'غير محدد'}</td>
                    <td>${quantity || 'غير محدد'}</td>
                    <td>${price} ج.م</td>
                    <td>${(quantity * price).toFixed(2)} ج.م</td>
                    <td>${type || 'غير محدد'}</td>
                </tr>
            `;
        }
    });
    if (sparePartsRows) {
        printContainer.innerHTML += `
            <section>
                <h3>مشتريات قطع الغيار</h3>
                <table>
                    <thead>
                        <tr>
                            <th>اسم الصنف</th>
                            <th>الكمية</th>
                            <th>السعر للوحدة (ج.م)</th>
                            <th>الإجمالي (ج.م)</th>
                            <th>النوع</th>
                        </tr>
                    </thead>
                    <tbody>${sparePartsRows}</tbody>
                </table>
            </section>
        `;
    }

    if (data.notes) {
        printContainer.innerHTML += `
            <section>
                <h3>ملاحظات إضافية</h3>
                <p>${data.notes}</p>
            </section>
        `;
    }

    printContainer.innerHTML += `
        <section>
            <p><strong>الإجمالي الكلي:</strong> <span id="totalCost">${document.getElementById('totalCost').textContent}</span> ج.م</p>
        </section>
        <section>
            <h3>توقيع مدير المركز</h3>
            <div class="signature-box"></div>
        </section>
        <footer>
            <p>توكيل بطاح الأصلي - وسط البلد - بجوار سينما ريفولي - القاهرة</p>
        </footer>
    `;

    html2pdf()
        .set({
            margin: [2, 2],
            filename: 'مقايسة_بطاح_الأصلي.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        .from(printContainer)
        .save();
});

// إرسال الاستمارة
document.getElementById('repairForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    alert('تم إرسال الاستمارة بنجاح!');
});