package Stahmsmvw.MoveiFlex.spotifyAuth;

public enum Keys {

    ClientId("e46654a198024b1e97a655387975bdf3"),
    ClientSc("38f7b34e697340989b6dff7ff9421085")
    ;

    private final String value;

    Keys(String value) {
        this.value = value;
    }

    public String value() {
        return value;
    }
}
