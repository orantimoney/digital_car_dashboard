*** Settings ***
Library             Browser

*** Variables ***
${URL}              http://localhost:1234/index.html


*** Keywords ***
Setup Dashboard
    New Browser    chromium    headless=false
    New Context    viewport={'width': 1920, 'height': 1080}
    New Page
    Go To    ${URL}
    Wait Until Network Is Idle    2s    