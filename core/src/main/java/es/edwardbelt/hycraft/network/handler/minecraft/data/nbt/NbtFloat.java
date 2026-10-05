package es.edwardbelt.hycraft.network.handler.minecraft.data.nbt;

import es.edwardbelt.hycraft.protocol.io.PacketBuffer;
import lombok.Getter;

import java.nio.charset.StandardCharsets;

@Getter
public class NbtFloat extends NbtTag {
    private final float value;

    public NbtFloat(float value, String name) {
        super(name);
        this.value = value;
    }

    public NbtFloat(float value) {
        this(value, null);
    }

    @Override
    void writePayload(PacketBuffer buffer) {
        buffer.writeFloat(value);
    }

    @Override
    int getId() {
        return 5;
    }
}
