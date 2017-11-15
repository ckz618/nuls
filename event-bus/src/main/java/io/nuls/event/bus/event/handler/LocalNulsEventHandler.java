package io.nuls.event.bus.event.handler;

import io.nuls.core.event.NulsEvent;
import io.nuls.event.bus.event.filter.NulsEventFilter;
import io.nuls.event.bus.event.filter.NulsEventFilterChain;
import io.nuls.event.bus.event.handler.intf.NulsEventHandler;

/**
 * Created by Niels on 2017/11/6.
 */
public abstract class LocalNulsEventHandler<T extends NulsEvent> implements NulsEventHandler<T> {

    private NulsEventFilterChain filterChain = new NulsEventFilterChain();

    public void addFilter(NulsEventFilter<T> filter) {
        filterChain.addFilter(filter);
    }

    public NulsEventFilterChain getFilterChain() {
        return filterChain;
    }
}
