/*
This file is used to determine any commands sent/received by the websockets
by either the client or server, and determine the command in a human readable format
according to the OBDII standard set by ISO/California Air Board/EU Directives
*/

SpliceCommand('010B')

interface Command {
    service: number;
    pid: number;
    cmd?: number;
    type?: string;
    value?: number;
    reference?: string;
}

function DecodeCommand (command) {

    let returnedCommand = SpliceCommand(command)

    switch(returnedCommand.service) {
        case(1):
        returnedCommand.type = "Current Data";
        return null;
        case(65):
        returnedCommand.type = "Returned Data";
        if (returnedCommand.cmd != null){
            switch (returnedCommand.pid) {
            case(5):
            returnedCommand.reference = "CoolantTemp";
            returnedCommand.value = returnedCommand.cmd - 40;

            return returnedCommand;
            case(11):
            returnedCommand.reference = "ManifoldPressure";
            returnedCommand.value = returnedCommand.cmd;

            return returnedCommand;
            case(12):
            returnedCommand.reference = "EngineRPM";
            returnedCommand.value = (returnedCommand.cmd / 4);

            return returnedCommand;
            case(13):
            returnedCommand.reference = "VehicleSpeed";
            returnedCommand.value = returnedCommand.cmd;
            
            return returnedCommand;
            }
        }

    }

    


}

function SpliceCommand (command) {

command = command.replace(/\s+/g, '');

var service = command.substring(0,2);

var pid = command.substring(2,4);

var cmd = command.substring(4);

var serviceNo = parseInt(service, 16);

var pidNo = parseInt(pid, 16);

var cmdNo = parseInt(cmd, 16);

let returnedCommand: Command = { service: serviceNo, pid: pidNo, cmd: cmdNo };

return returnedCommand;

}