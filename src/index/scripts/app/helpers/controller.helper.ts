export class ControllerHelper {

    public static check(readyStatus: ReadyStatus): boolean {

        for (status in readyStatus) {
            if (readyStatus.hasOwnProperty(status)) {
                if (readyStatus[status] == false) {
                    return false;
                }
            }
        }
        return true;

    }

}

abstract class ReadyStatus {
    // key: string = value
}