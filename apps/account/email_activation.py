import random
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from smtplib import SMTP

from django.template.loader import render_to_string

from finca_project.settings import EMAIL_MAIL_SUBJECT, EMAIL_FROM_ADDRESS, EMAIL_SERVER, EMAIL_PORT, EMAIL_PASSWORD, \
    EMAIL_ADDRESS


def send_email_with_activation_code(to, code):
    msg = MIMEMultipart('alternative')
    msg['Subject'] = EMAIL_MAIL_SUBJECT
    msg['From'] = EMAIL_FROM_ADDRESS
    msg['To'] = to

    try:
        html = render_to_string('mail_body.html', {'code': code})
        part2 = MIMEText(html, 'html')
        msg.attach(part2)
    except AttributeError:
        pass

    server = SMTP(EMAIL_SERVER, EMAIL_PORT)
    server.starttls()
    server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
    server.sendmail(EMAIL_FROM_ADDRESS, to, msg.as_string())
    server.quit()


def generate_code(length: int, include_characters: bool = False) -> str:
    chars = "0123456789"
    if include_characters:
        chars = (
            "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        )
    password = ""

    for i in range(length):
        password += random.choice(chars)

    return password
