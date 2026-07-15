const loginOtpEmail = ({ fullName, otp }) => {
    return ` 
    <div style="margin:0;padding:20px;background:#f8f8f8;font-family:Lato,Arial,sans-serif;">

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
                <td align="center">

                    <table
                        role="presentation"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        width="100%"
                        style="max-width:550px;background:#ffffff;border:1px solid #eeeeee;border-radius:12px;"
                    >

                        <tr>
                            <td style="padding:40px 25px;">

                                <h1
                                    style="
                                   margin:0;
                                   font-size:28px;
                                   color:#222222;
                                   font-family:Poppins,Arial,sans-serif;
                                    "
                                >
                                    Login Verification
                                </h1>

                                <p
                                    style="
                                    margin-top:20px;
                                    font-size:16px;
                                    line-height:1.7;
                                    color:#666666;
                                    "
                                >
                                    Hi <strong>${fullName}</strong>,
                                </p>

                                <p
                                    style="
                                    font-size:16px;
                                    line-height:1.7;
                                    color:#666666;
                                    "
                                >
                                    Use the OTP below to securely log in to your
                                    <strong>Cravyo</strong> account.
                                </p>

                                <div
                                    style="
                                    margin:35px 0;
                                    padding:20px 15px;
                                    background:#fff5f1;
                                    border:2px dashed #ff5a1f;
                                    border-radius:10px;
                                    text-align:center;
                                    "
                                >

                                    <div
                                        style="
                                        font-size:14px;
                                        color:#666666;
                                        margin-bottom:10px;
                                    "
                                    >
                                        Your One-Time Password
                                    </div>

                                    <div
                                        style="
                                        font-size:40px;
                                        font-weight:700;
                                        letter-spacing:8px;
                                        color:#ff5a1f;
                                        font-family:Poppins,Arial,sans-serif;
                                    "
                                    >
                                        ${otp}
                                    </div>

                                </div>

                                <p
                                    style="
                                    font-size:15px;
                                    line-height:1.7;
                                    color:#666666;
                                    "
                                >
                                    This OTP is valid for
                                    <strong style="color:#222222;">5 minutes</strong>.
                                </p>

                                <p
                                    style="
                                    font-size:15px;
                                    line-height:1.7;
                                    color:#666666;
                                    "
                                >
                                    Never share this OTP with anyone.
                                    Cravyo will never ask for your OTP.
                                </p>

                                <hr
                                    style="
                                    border:none;
                                    border-top:1px solid #eeeeee;
                                    margin:30px 0;
                                    "
                                >

                                    <p
                                        style="
                                        font-size:13px;
                                        line-height:1.7;
                                        color:#999999;
                                        text-align:center;
                                        "
                                    >
                                        If you didn't request this login, you can safely ignore this email.
                                    </p>

                            </td>
                        </tr>

                    </table>

                </td>
            </tr>
        </table>

    </div>
    `;
};

export default loginOtpEmail;