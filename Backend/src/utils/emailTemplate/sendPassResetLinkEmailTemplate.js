const resetPasswordEmail = ({ fullName, resetPasswordLink }) => {
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
                                    Reset Password
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
                                    We received a request to reset your
                                    <strong>Cravyo</strong> account password.
                                </p>

                                <div
                                    style="
                                    margin:35px 0;
                                    text-align:center;
                                    "
                                >

                                    <a
                                        href="${resetPasswordLink}"
                                        style="
                                        display:inline-block;
                                        background:#ff5a1f;
                                        color:#ffffff;
                                        text-decoration:none;
                                        padding:15px 35px;
                                        border-radius:8px;
                                        font-size:16px;
                                        font-weight:bold;
                                        font-family:Poppins,Arial,sans-serif;
                                        "
                                    >
                                        Reset Password
                                    </a>

                                </div>

                                <p
                                    style="
                                    font-size:15px;
                                    line-height:1.7;
                                    color:#666666;
                                    "
                                >
                                    This password reset link is valid for
                                    <strong style="color:#222222;">10 minutes</strong>.
                                </p>

                                <p
                                    style="
                                    font-size:15px;
                                    line-height:1.7;
                                    color:#666666;
                                    "
                                >
                                    If you didn't request a password reset, you can safely ignore this email.
                                    Your password will remain unchanged.
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
                                    For your security, never share your account credentials with anyone.
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

export default resetPasswordEmail;