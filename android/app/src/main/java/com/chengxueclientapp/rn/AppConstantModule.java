package com.chengxueclientapp.rn;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.chengxueclientapp.BuildConfig;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.util.HashMap;
import java.util.Map;

/**
 * 定义原生模块
 */
public class AppConstantModule extends ReactContextBaseJavaModule {

    public AppConstantModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
    }

    /**
     * 返回原生模块注册时的名称,在 js 层,使用此名称来调用原生模块
     */
    @NonNull
    @Override
    public String getName() {
        return "AppConstant";
    }

    /*
    此方法返回的常量值，会直接注如到 js 层，可以在 js 层直接获取
     */
    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> resultMap = new HashMap<>(16);
        resultMap.put("versionName", BuildConfig.VERSION_NAME);
        resultMap.put("versionCode", BuildConfig.VERSION_CODE);
        return resultMap;
    }
}
