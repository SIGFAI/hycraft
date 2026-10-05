package es.edwardbelt.hycraft.network.handler.minecraft.data.nbt;

import es.edwardbelt.hycraft.protocol.io.PacketBuffer;
import lombok.Getter;

import java.nio.charset.StandardCharsets;

@Getter
public class NbtDouble extends NbtTag {
    private final double value;

    public NbtDouble(double value, String name) {
        super(name);
        this.value = value;
    }

    public NbtDouble(double value) {
        this(value, null);
    }

    @Override
    void writePayload(PacketBuffer buffer) {
        buffer.writeDouble(value);
    }

    @Override
    int getId() {
        return 6;
    }
}
