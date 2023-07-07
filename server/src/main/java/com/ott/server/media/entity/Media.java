package com.ott.server.media.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ott.server.audit.Auditable;
import com.ott.server.bookmark.entity.Bookmark;
import com.ott.server.genre.entity.Genre;
import com.ott.server.mediaott.entity.MediaOtt;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Media extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mediaId;

    @Column(length = 50, nullable = false)
    private String title;

    @Column(length = 1000, nullable = false)
    private String content;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String creator;

    @Column(nullable = false)
    private String cast;

    @Column(length = 500, nullable = true)
    private String mainPoster;

    @Column(length = 500, nullable = true)
    private String titlePoster;

    @Column(nullable = false)
    private int releaseDate;

    @Column(nullable = false)
    private String ageRate;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private Boolean recent;

    @OneToMany(mappedBy = "media", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JsonManagedReference
    private List<Genre> genres = new ArrayList<>();

    @OneToMany(mappedBy = "media", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JsonManagedReference
    private List<MediaOtt> mediaOtts = new ArrayList<>();

    @OneToMany(mappedBy = "media", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JsonManagedReference
    private List<Bookmark> bookmarks = new ArrayList<>();

    public void setId(Long aLong) {
    }
}