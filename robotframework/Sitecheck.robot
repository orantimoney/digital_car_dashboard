*** Settings ***
Library   Browser

Resource            common.resource

Suite Setup         Setup Dashboard

*** Test Cases ***

Main Page Loads
    New Page       http://localhost:1234/index.html
    Get Title    ==    Digital Car Dashboard

Go to Settings
    Click       xpath=/html/body/div[2]/div[1]/a/div/h1
    Wait Until Network Is Idle    2s
    Get Title    ==     Settings5

Assert Settings Table Exists
    Get Text    xpath=/html/body/div[2]/form/h2  ==     Settings for Device Connection

Go To Logs
    Click           xpath=/html/body/footer/div/div[2]/a/div/h1
    Get Title   ==      Logs

Check Logs Table Exists
    Get Text    xpath=/html/body/div[2]/form/h2     ==      Select Log File

Go To Diagnostics
    Click          xpath=/html/body/footer/div/div[3]/a/div/h1

Check Diagnostics Table Exists
    Get Text       xpath=/html/body/div[2]/table/thead/tr[1]/th[1]/h3   ==    Type of Problem
    Get Text       xpath=/html/body/div[2]/table/thead/tr[1]/th[2]/h3   ==    Diagnostic Trouble Code & Description of Problem
    Get Text       xpath=/html/body/div[2]/table/thead/tr[1]/th[3]/h3   ==    Action

Return To Dashboard
    Click          xpath=/html/body/footer/div/div[1]/a/div/h1
    Get Title   ==      Digital Car Dashboard