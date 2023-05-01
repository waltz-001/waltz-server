const verifyEmailTemplate = (name, id, token) => ( `
    <body bgcolor="#FFFFFF" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<!-- Save for Web Slices (Email-Generated.png) -->
<table id="Table_01" width="650" height="500" cellpadding="0" cellspacing="0">
	<tr>
		<td colspan="3">
			<img src="https://res.cloudinary.com/saptya/image/upload/v1682934933/Frame_2_ln36ri.png" width="650" height="410" alt=""></td>
	</tr>
	<tr>
		<td>
			<p style=" font-size: 20px; font-family: sans-serif;">
				Dear ${name}, </br>
				We're super excited you joined today and created your WALTZ account.</br> You are just a few clicks away registering for Waltz 2023.
			</p>
	</tr>
	<tr>
		<td>
			<a href="${process.env.CLIENT_URL}/register/${id}/verify/${token}">
				<img src="https://res.cloudinary.com/saptya/image/upload/v1682934824/verify-email_ygto57.png" width="650" height="190" alt=""></td>
			</a>
	</tr>
	<tr>
		<td>
			<img src="https://res.cloudinary.com/saptya/image/upload/v1682934801/Email-Generated_08_gqhcca.png" width="650" height="170" alt=""></td>
	</tr>
	<tr>
		<td>
			<p style=" font-size: 16px; font-family: sans-serif; text-align: center; color: #5B13D1; margin: 10px;">
				This message is an automated alert from waltz2k23.com.
			</p>
			</td>
	</tr>
</table>
<!-- End Save for Web Slices -->
</body>
</html>
    `
)

module.exports = verifyEmailTemplate
