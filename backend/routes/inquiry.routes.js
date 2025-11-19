import express from 'express';
import ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';
import { Op } from 'sequelize';
import Inquiry from '../models/Inquiry.model.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = express.Router();

// Export routes fixed - Excel and PDF now working properly

// Public route - create inquiry (no auth required)
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, company, subject, message, type } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required'
            });
        }

        // Create inquiry
        const inquiry = await Inquiry.create({
            name,
            email,
            phone: phone || null,
            company: company || null,
            subject: subject || 'General Inquiry',
            message,
            type: type || 'general',
            status: 'new',
            priority: 'medium'
        });

        res.status(201).json({
            success: true,
            message: 'Inquiry submitted successfully',
            data: inquiry
        });
    } catch (error) {
        console.error('Inquiry creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit inquiry',
            error: error.message
        });
    }
});

// Protected routes (Admin only)

// Export routes MUST come before /:id route to avoid conflicts
// Export to Excel (Admin only)
router.get('/export/excel', protect, adminOnly, async (req, res) => {
    try {
        const { startDate, endDate, status, type } = req.query;

        // Build query filters
        const where = {};
        if (startDate && endDate) {
            where.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }
        if (status) where.status = status;
        if (type) where.type = type;

        // Fetch inquiries
        const inquiries = await Inquiry.findAll({
            where,
            order: [['createdAt', 'DESC']]
        });

        // Create workbook
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'WisdomQuantums Admin';
        workbook.created = new Date();

        const worksheet = workbook.addWorksheet('Inquiries', {
            properties: { tabColor: { argb: '2563EB' } }
        });

        // Define columns with professional formatting
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 8 },
            { header: 'Date', key: 'date', width: 12 },
            { header: 'Time', key: 'time', width: 10 },
            { header: 'Name', key: 'name', width: 20 },
            { header: 'Email', key: 'email', width: 25 },
            { header: 'Phone', key: 'phone', width: 15 },
            { header: 'Company', key: 'company', width: 20 },
            { header: 'Subject', key: 'subject', width: 25 },
            { header: 'Message', key: 'message', width: 40 },
            { header: 'Type', key: 'type', width: 12 },
            { header: 'Status', key: 'status', width: 12 },
            { header: 'Priority', key: 'priority', width: 10 },
            { header: 'Notes', key: 'notes', width: 30 }
        ];

        // Style header row
        worksheet.getRow(1).font = { bold: true, size: 12, color: { argb: 'FFFFFF' } };
        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '2563EB' }
        };
        worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getRow(1).height = 25;

        // Add data rows
        inquiries.forEach((inquiry, index) => {
            const createdAt = new Date(inquiry.createdAt);
            const row = worksheet.addRow({
                id: inquiry.id,
                date: createdAt.toLocaleDateString('en-IN'),
                time: createdAt.toLocaleTimeString('en-IN'),
                name: inquiry.name,
                email: inquiry.email,
                phone: inquiry.phone || 'N/A',
                company: inquiry.company || 'N/A',
                subject: inquiry.subject || 'N/A',
                message: inquiry.message,
                type: inquiry.type,
                status: inquiry.status,
                priority: inquiry.priority,
                notes: inquiry.notes || 'N/A'
            });

            // Alternate row colors
            if (index % 2 === 0) {
                row.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'F3F4F6' }
                };
            }

            // Status color coding
            const statusCell = row.getCell('status');
            switch (inquiry.status) {
                case 'new':
                    statusCell.font = { color: { argb: '059669' }, bold: true };
                    break;
                case 'in-progress':
                    statusCell.font = { color: { argb: 'F59E0B' }, bold: true };
                    break;
                case 'resolved':
                    statusCell.font = { color: { argb: '2563EB' }, bold: true };
                    break;
                case 'closed':
                    statusCell.font = { color: { argb: '6B7280' }, bold: true };
                    break;
            }

            // Priority color coding
            const priorityCell = row.getCell('priority');
            switch (inquiry.priority) {
                case 'high':
                    priorityCell.font = { color: { argb: 'DC2626' }, bold: true };
                    break;
                case 'medium':
                    priorityCell.font = { color: { argb: 'F59E0B' }, bold: true };
                    break;
                case 'low':
                    priorityCell.font = { color: { argb: '059669' }, bold: true };
                    break;
            }

            // Wrap text for message column
            row.getCell('message').alignment = { wrapText: true, vertical: 'top' };
            row.height = 30;
        });

        // Add borders to all cells
        worksheet.eachRow((row) => {
            row.eachCell((cell) => {
                cell.border = {
                    top: { style: 'thin', color: { argb: 'D1D5DB' } },
                    left: { style: 'thin', color: { argb: 'D1D5DB' } },
                    bottom: { style: 'thin', color: { argb: 'D1D5DB' } },
                    right: { style: 'thin', color: { argb: 'D1D5DB' } }
                };
            });
        });

        // Add summary at the bottom
        const summaryRow = worksheet.addRow([]);
        summaryRow.height = 5;

        const totalRow = worksheet.addRow(['', '', 'TOTAL INQUIRIES:', inquiries.length]);
        totalRow.font = { bold: true, size: 11 };
        totalRow.getCell(3).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'DBEAFE' }
        };
        totalRow.getCell(4).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'DBEAFE' }
        };

        // Generate buffer first to get proper content length
        const buffer = await workbook.xlsx.writeBuffer();

        // Set response headers for proper Excel format
        const filename = `Inquiries_${new Date().toISOString().split('T')[0]}.xlsx`;

        // Clear any previous headers
        res.removeHeader('Content-Type');
        res.removeHeader('Content-Disposition');

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Length', buffer.length);
        res.setHeader('Cache-Control', 'no-cache');

        // Send buffer as binary
        res.end(buffer, 'binary');

    } catch (error) {
        console.error('Excel export error:', error);
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
});

// Export to PDF (Admin only)
router.get('/export/pdf', protect, adminOnly, async (req, res) => {
    try {
        const { startDate, endDate, status, type } = req.query;

        // Build query filters
        const where = {};
        if (startDate && endDate) {
            where.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }
        if (status) where.status = status;
        if (type) where.type = type;

        // Fetch inquiries
        const inquiries = await Inquiry.findAll({
            where,
            order: [['createdAt', 'DESC']]
        });

        // Set response headers FIRST
        const filename = `Inquiries_${new Date().toISOString().split('T')[0]}.pdf`;

        // Clear any previous headers
        res.removeHeader('Content-Type');
        res.removeHeader('Content-Disposition');

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Cache-Control', 'no-cache');

        // Create PDF document
        const doc = new PDFDocument({
            size: 'A4',
            margin: 50,
            bufferPages: true
        });

        // Pipe PDF to response
        doc.pipe(res);

        // Header
        doc.fontSize(24)
            .fillColor('#2563EB')
            .text('WisdomQuantums', { align: 'center' })
            .fontSize(16)
            .fillColor('#000000')
            .text('Inquiries Report', { align: 'center' })
            .moveDown();

        // Date and summary
        doc.fontSize(10)
            .fillColor('#6B7280')
            .text(`Generated on: ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`, { align: 'center' })
            .moveDown();

        // Summary box
        doc.fontSize(11)
            .fillColor('#000000')
            .text(`Total Inquiries: ${inquiries.length}`, { continued: true })
            .text(`  |  `, { continued: true });

        if (status) doc.text(`Status: ${status}`, { continued: true }).text(`  |  `, { continued: true });
        if (type) doc.text(`Type: ${type}`, { continued: true });

        doc.moveDown(2);

        // Draw line
        doc.moveTo(50, doc.y)
            .lineTo(545, doc.y)
            .strokeColor('#E5E7EB')
            .stroke();

        doc.moveDown();

        // Inquiries
        inquiries.forEach((inquiry, index) => {
            // Check if we need a new page
            if (doc.y > 700) {
                doc.addPage();
            }

            const createdAt = new Date(inquiry.createdAt);

            // Inquiry header with background
            const headerY = doc.y;
            doc.rect(50, headerY, 495, 25)
                .fillAndStroke('#F3F4F6', '#E5E7EB');

            doc.fontSize(12)
                .fillColor('#2563EB')
                .text(`#${inquiry.id} - ${inquiry.name}`, 60, headerY + 8, { continued: true })
                .fontSize(9)
                .fillColor('#6B7280')
                .text(`  ${createdAt.toLocaleDateString('en-IN')} ${createdAt.toLocaleTimeString('en-IN')}`, { align: 'right' });

            doc.moveDown(0.5);

            // Details
            doc.fontSize(10)
                .fillColor('#000000');

            const leftX = 60;
            const rightX = 200;
            let currentY = doc.y;

            // Email
            doc.font('Helvetica-Bold').text('Email:', leftX, currentY, { continued: true, width: 100 })
                .font('Helvetica').text(inquiry.email, rightX, currentY);
            currentY += 15;

            // Phone
            if (inquiry.phone) {
                doc.font('Helvetica-Bold').text('Phone:', leftX, currentY, { continued: true, width: 100 })
                    .font('Helvetica').text(inquiry.phone, rightX, currentY);
                currentY += 15;
            }

            // Company
            if (inquiry.company) {
                doc.font('Helvetica-Bold').text('Company:', leftX, currentY, { continued: true, width: 100 })
                    .font('Helvetica').text(inquiry.company, rightX, currentY);
                currentY += 15;
            }

            // Subject
            doc.font('Helvetica-Bold').text('Subject:', leftX, currentY, { continued: true, width: 100 })
                .font('Helvetica').text(inquiry.subject || 'N/A', rightX, currentY);
            currentY += 15;

            // Type and Status
            doc.font('Helvetica-Bold').text('Type:', leftX, currentY, { continued: true, width: 100 })
                .font('Helvetica').text(inquiry.type, rightX, currentY, { continued: true })
                .font('Helvetica-Bold').text('  Status:', { continued: true })
                .font('Helvetica').text(inquiry.status.toUpperCase());
            currentY += 15;

            // Priority
            doc.font('Helvetica-Bold').text('Priority:', leftX, currentY, { continued: true, width: 100 })
                .font('Helvetica').text(inquiry.priority, rightX, currentY);
            currentY += 20;

            // Message box
            doc.y = currentY;
            doc.fontSize(9)
                .fillColor('#374151')
                .font('Helvetica-Bold')
                .text('Message:', leftX);

            doc.fontSize(9)
                .fillColor('#000000')
                .font('Helvetica')
                .text(inquiry.message, leftX, doc.y + 5, {
                    width: 485,
                    align: 'left'
                });

            // Notes if available
            if (inquiry.notes) {
                doc.moveDown(0.5);
                doc.fontSize(9)
                    .fillColor('#374151')
                    .font('Helvetica-Bold')
                    .text('Notes:', leftX);

                doc.fontSize(9)
                    .fillColor('#000000')
                    .font('Helvetica')
                    .text(inquiry.notes, leftX, doc.y + 5, {
                        width: 485,
                        align: 'left'
                    });
            }

            doc.moveDown(1.5);

            // Separator line
            doc.moveTo(50, doc.y)
                .lineTo(545, doc.y)
                .strokeColor('#E5E7EB')
                .stroke();

            doc.moveDown();
        });

        // Footer on last page
        const pages = doc.bufferedPageRange();
        for (let i = 0; i < pages.count; i++) {
            doc.switchToPage(i);

            doc.fontSize(8)
                .fillColor('#6B7280')
                .text(
                    `WisdomQuantums Admin Panel - Confidential Document | Page ${i + 1} of ${pages.count}`,
                    50,
                    doc.page.height - 50,
                    { align: 'center', width: 495 }
                );
        }

        // Finalize PDF
        doc.end();

    } catch (error) {
        console.error('PDF export error:', error);
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
});

// Get all inquiries
router.get('/', protect, adminOnly, async (req, res) => {
    try {
        const { page = 1, limit = 10, status, type } = req.query;
        const offset = (page - 1) * limit;

        const where = {};
        if (status) where.status = status;
        if (type) where.type = type;

        const { count, rows } = await Inquiry.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createdAt', 'DESC']]
        });

        res.json({
            success: true,
            data: rows,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(count / limit)
            }
        });
    } catch (error) {
        console.error('Inquiry fetch error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get single inquiry by ID
router.get('/:id', protect, adminOnly, async (req, res) => {
    try {
        const inquiry = await Inquiry.findByPk(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ success: false, message: 'Inquiry not found' });
        }
        res.json({ success: true, data: inquiry });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put('/:id', protect, adminOnly, async (req, res) => {
    try {
        const inquiry = await Inquiry.findByPk(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ success: false, message: 'Inquiry not found' });
        }
        await inquiry.update(req.body);
        res.json({ success: true, data: inquiry });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const inquiry = await Inquiry.findByPk(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ success: false, message: 'Inquiry not found' });
        }
        await inquiry.destroy();
        res.json({ success: true, message: 'Inquiry deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
