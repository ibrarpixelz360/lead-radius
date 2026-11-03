<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Invoice <?php echo e($payment->invoice_number); ?></title>
    <style>
        body { font-family: Arial, sans-serif; color: #1F2937; font-size: 12px; line-height: 1.5; padding: 40px; }
        .header { display: flex; justify-content: space-between; border-bottom: 2px solid #2563EB; padding-bottom: 20px; margin-bottom: 30px; }
        .brand { font-size: 24px; font-weight: bold; color: #2563EB; }
        .meta { text-align: right; font-size: 11px; color: #6B7280; }
        .meta strong { color: #111827; font-size: 13px; }
        .section { margin-bottom: 24px; }
        .section h3 { font-size: 11px; text-transform: uppercase; color: #6B7280; margin: 0 0 6px 0; letter-spacing: 0.5px; }
        .section p { margin: 0; }
        .columns { display: table; width: 100%; }
        .columns > div { display: table-cell; width: 50%; vertical-align: top; }
        table { width: 100%; border-collapse: collapse; margin-top: 8px; }
        th { background: #F3F4F6; text-align: left; padding: 10px 12px; font-size: 11px; text-transform: uppercase; color: #6B7280; border-bottom: 1px solid #E5E7EB; }
        td { padding: 14px 12px; border-bottom: 1px solid #E5E7EB; }
        .total-row td { font-size: 14px; font-weight: bold; background: #F9FAFB; }
        .footer { margin-top: 40px; text-align: center; font-size: 10px; color: #9CA3AF; }
        .badge { display: inline-block; padding: 3px 8px; border-radius: 4px; background: #D1FAE5; color: #065F46; font-size: 10px; font-weight: bold; text-transform: uppercase; }
    </style>
</head>
<body>
    <div class="header">
        <div>
            <div class="brand"><?php echo e($app_name); ?></div>
            <p style="font-size: 11px; color: #6B7280; margin: 4px 0 0 0;">Verified GMB Leads, Instantly</p>
        </div>
        <div class="meta">
            <p><strong>INVOICE</strong></p>
            <p><?php echo e($payment->invoice_number); ?></p>
            <p>Issued: <?php echo e($payment->reviewed_at?->format('M j, Y') ?: $payment->created_at->format('M j, Y')); ?></p>
            <p><span class="badge">PAID</span></p>
        </div>
    </div>

    <div class="columns section">
        <div>
            <h3>Billed to</h3>
            <p><strong><?php echo e($payment->user->name); ?></strong></p>
            <p><?php echo e($payment->user->email); ?></p>
            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($payment->user->phone): ?>
                <p><?php echo e($payment->user->phone); ?></p>
            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
        </div>
        <div>
            <h3>Payment from</h3>
            <p><strong><?php echo e($payment->sender_name); ?></strong></p>
            <p>Account: <?php echo e($payment->sender_account); ?></p>
            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($payment->bank_name): ?>
                <p>Bank: <?php echo e($payment->bank_name); ?></p>
            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
            <p>Transaction ID: <?php echo e($payment->transaction_id); ?></p>
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Description</th>
                <th style="text-align: right;">Amount</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <strong><?php echo e($payment->plan->name); ?> Plan</strong><br>
                    <span style="color: #6B7280; font-size: 11px;">
                        <?php echo e(ucfirst($payment->plan->billing_cycle)); ?> subscription
                        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($payment->subscription): ?>
                            · <?php echo e($payment->subscription->starts_at->format('M j, Y')); ?>

                            – <?php echo e($payment->subscription->ends_at->format('M j, Y')); ?>

                        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                    </span>
                </td>
                <td style="text-align: right;">
                    <?php echo e($payment->currency); ?> <?php echo e(number_format((float) $payment->amount, 2)); ?>

                </td>
            </tr>
            <tr class="total-row">
                <td>Total Paid</td>
                <td style="text-align: right;">
                    <?php echo e($payment->currency); ?> <?php echo e(number_format((float) $payment->amount, 2)); ?>

                </td>
            </tr>
        </tbody>
    </table>

    <div class="section" style="margin-top: 32px; padding: 16px; background: #F9FAFB; border-radius: 6px; font-size: 11px;">
        <h3>Payment received via</h3>
        <p style="color: #1F2937;">
            <?php echo e($bank['name'] ?? 'Bank transfer'); ?>

            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(!empty($bank['account_title'])): ?>
                · <?php echo e($bank['account_title']); ?>

            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
        </p>
    </div>

    <div class="footer">
        This is an automatically generated invoice. For billing questions, contact billing@customernearme.com.
        <br>
        Thank you for choosing <?php echo e($app_name); ?>.
    </div>
</body>
</html>
<?php /**PATH C:\laragon\www\lead-radius-main\resources\views/invoices/template.blade.php ENDPATH**/ ?>