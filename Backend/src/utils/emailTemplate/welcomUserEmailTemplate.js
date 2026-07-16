const welcomeEmail = ({ fullName }) => {
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
                                    Welcome to Cravyo 🎉
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
                                    Your <strong>Cravyo</strong> account has been created successfully.
                                </p>

                                <div
                                    style="
                                    margin:35px 0;
                                    padding:25px 20px;
                                    background:#fff5f1;
                                    border:2px dashed #ff5a1f;
                                    border-radius:10px;
                                    text-align:center;
                                    "
                                >

                                    <div
                                        style="
                                        font-size:42px;
                                        margin-bottom:10px;
                                        "
                                    >
                                        🍔🍕🥗
                                    </div>

                                    <div
                                        style="
                                        font-size:18px;
                                        font-weight:700;
                                        color:#ff5a1f;
                                        font-family:Poppins,Arial,sans-serif;
                                        "
                                    >
                                        Happy Ordering!
                                    </div>

                                </div>

                                <p
                                    style="
                                    font-size:15px;
                                    line-height:1.7;
                                    color:#666666;
                                    "
                                >
                                    We're excited to have you with us. Discover your favorite restaurants,
                                    explore delicious meals, and enjoy fast doorstep delivery.
                                </p>

                                <p
                                    style="
                                    font-size:15px;
                                    line-height:1.7;
                                    color:#666666;
                                    "
                                >
                                    Thank you for choosing <strong>Cravyo</strong>. We can't wait to serve you!
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
                                    Welcome aboard ❤️<br>
                                    Team Cravyo
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

export default welcomeEmail;