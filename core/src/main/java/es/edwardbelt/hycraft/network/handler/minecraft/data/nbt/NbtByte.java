package es.edwardbelt.hycraft.network.handler.minecraft.data.nbt;

import es.edwardbelt.hycraft.protocol.io.PacketBuffer;
import lombok.Getter;

import java.nio.charset.StandardCharsets;

@Getter
public class NbtByte extends NbtTag {
    private final byte value;

    public NbtByte(byte value, String name) {
        super(name);
        this.value = value;
    }

    public NbtByte(byte value) {
        this(value, null);
    }

    @Override
    void writePayload(PacketBuffer buffer) {
        buffer.writeByte(value);
    }

    @Override
    int getId() {
        return 1;
    }
}
