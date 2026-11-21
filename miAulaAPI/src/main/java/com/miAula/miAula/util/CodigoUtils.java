package com.miAula.miAula.util;

import java.util.Locale;

public final class CodigoUtils {

    public static final String PATRON_ENTRADA = "^[A-Za-z0-9]{6}$";
    public static final String PATRON_CANONICO = "^[A-Z0-9]{6}$";

    private CodigoUtils() {
    }

    public static String normalizar(String codigo) {
        return codigo.toUpperCase(Locale.ROOT);
    }
}
