package es.edwardbelt.hycraft.network.handler.minecraft.data.nbt;

import es.edwardbelt.hycraft.protocol.io.PacketBuffer;
import lombok.Getter;

import java.nio.charset.StandardCharsets;

@Getter
public class NbtShort extends NbtTag {
    private final short value;

    public NbtShort(short value, String name) {
        super(name);
        this.value = value;
    }

    public NbtShort(short value) {
        this(value, null);
    }

    @Override
    void writePayload(PacketBuffer buffer) {
        buffer.writeShort(value);
    }

    @Override
    int getId() {
        return 2;
    }
}
