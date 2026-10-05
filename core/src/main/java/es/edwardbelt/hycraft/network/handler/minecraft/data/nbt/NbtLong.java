package es.edwardbelt.hycraft.network.handler.minecraft.data.nbt;

import es.edwardbelt.hycraft.protocol.io.PacketBuffer;
import lombok.Getter;

import java.nio.charset.StandardCharsets;

@Getter
public class NbtLong extends NbtTag {
    private final long value;

    public NbtLong(long value, String name) {
        super(name);
        this.value = value;
    }

    public NbtLong(long value) {
        this(value, null);
    }

    @Override
    void writePayload(PacketBuffer buffer) {
        buffer.writeLong(value);
    }

    @Override
    int getId() {
        return 4;
    }
}
